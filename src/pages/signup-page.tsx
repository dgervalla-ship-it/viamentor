/**
 * VIAMENTOR - Page d'inscription
 */

import { SignupForm } from "../components/auth/signup-form";

export function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Viamentor
          </h1>
          <p className="text-gray-600">
            Créez votre compte gratuitement
          </p>
        </div>
        
        <SignupForm />
        
        <div className="mt-6 text-center text-xs text-gray-500">
          En créant un compte, vous acceptez nos{' '}
          <a href="/cgu" className="text-primary hover:underline">
            Conditions Générales
          </a>{' '}
          et notre{' '}
          <a href="/privacy" className="text-primary hover:underline">
            Politique de confidentialité
          </a>
        </div>
      </div>
    </div>
  );
}

