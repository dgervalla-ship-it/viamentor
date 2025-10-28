/**
 * VIAMENTOR - Page de connexion
 */

import { LoginForm } from "../components/auth/login-form";

export function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Viamentor
          </h1>
          <p className="text-gray-600">
            Plateforme de gestion d'auto-écoles
          </p>
        </div>
        
        <LoginForm />
      </div>
    </div>
  );
}

