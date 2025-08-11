'use client';

import { useState, useEffect } from 'react';
import { API_CONFIG, buildApiUrl } from '../config/api';

interface ApiTestResult {
  endpoint: string;
  status: 'pending' | 'success' | 'error';
  response?: any;
  error?: string;
}

export default function ApiTest() {
  const [testResults, setTestResults] = useState<ApiTestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const testEndpoints = [
    { name: 'Health Check', endpoint: '/' },
    { name: 'Facilities', endpoint: API_CONFIG.ENDPOINTS.FACILITIES.LIST },
    { name: 'Courts', endpoint: API_CONFIG.ENDPOINTS.COURTS.LIST },
    { name: 'Auth Status', endpoint: API_CONFIG.ENDPOINTS.AUTH.LOGIN },
  ];

  const runApiTest = async () => {
    setIsRunning(true);
    const results: ApiTestResult[] = [];

    for (const test of testEndpoints) {
      const result: ApiTestResult = {
        endpoint: test.name,
        status: 'pending',
      };

      setTestResults([...results, result]);
      results.push(result);

      try {
        const response = await fetch(buildApiUrl(test.endpoint), {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          result.status = 'success';
          result.response = data;
        } else {
          result.status = 'error';
          result.error = `HTTP ${response.status}: ${response.statusText}`;
        }
      } catch (error) {
        result.status = 'error';
        result.error = error instanceof Error ? error.message : 'Unknown error';
      }

      setTestResults([...results]);
    }

    setIsRunning(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return '⏳';
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      default:
        return '❓';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-600';
      case 'success':
        return 'text-green-600';
      case 'error':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          API Connection Test
        </h2>
        <p className="text-gray-600">
          Test the connection between frontend and backend services
        </p>
        <div className="mt-2 text-sm text-gray-500">
          <strong>Backend URL:</strong> {API_CONFIG.BASE_URL}
        </div>
      </div>

      <div className="mb-6">
        <button
          onClick={runApiTest}
          disabled={isRunning}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isRunning ? 'Testing...' : 'Run API Test'}
        </button>
      </div>

      {testResults.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Test Results</h3>
          {testResults.map((result, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 bg-gray-50"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-900">
                  {result.endpoint}
                </span>
                <span className={`font-semibold ${getStatusColor(result.status)}`}>
                  {getStatusIcon(result.status)} {result.status.toUpperCase()}
                </span>
              </div>
              
              {result.status === 'success' && result.response && (
                <div className="mt-2">
                  <details className="text-sm">
                    <summary className="cursor-pointer text-blue-600 hover:text-blue-800">
                      View Response
                    </summary>
                    <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-x-auto">
                      {JSON.stringify(result.response, null, 2)}
                    </pre>
                  </details>
                </div>
              )}
              
              {result.status === 'error' && result.error && (
                <div className="mt-2 text-sm text-red-600 bg-red-50 p-2 rounded">
                  <strong>Error:</strong> {result.error}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-semibold text-blue-900 mb-2">What This Test Does</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Tests basic connectivity to the backend API</li>
          <li>• Verifies that CORS is properly configured</li>
          <li>• Checks if API endpoints are responding</li>
          <li>• Helps diagnose connection issues during development</li>
        </ul>
      </div>
    </div>
  );
}
