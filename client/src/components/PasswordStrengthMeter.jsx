import { Check, X } from "lucide-react"; // Make sure you import these


const PasswordCriteria = ({ password }) => {
  const criteria = [
    { label: 'At least 8 characters', valid: password.length >= 8 },
    { label: 'Contains uppercase letters', valid: /[A-Z]/.test(password) },
    { label: 'Contains lowercase letters', valid: /[a-z]/.test(password) },
    { label: 'Contains numbers', valid: /\d/.test(password) },
    { label: 'Contains special characters', valid: /[!@#$%^&*(),.?":{}|<>]/.test(password) }
  ];

return (
  <div className="mt-2 space-y-1">
    {criteria.map((item) => (
      <div key={item.label} className="flex items-center text-xs">
        {item.valid ? (
          <Check className="size-4 text-green-500 mr-2" />
        ) : (
          <X className="size-4 text-gray-500 mr-2" />
        )}
        <span className={item.met ? "text-green-500" : "text-gray-400"}>
          {item.label}
        </span>
      </div>
    ))}
  </div>
);
};

const PasswordStrengthMeter = ({ password }) => {
  const getStrength = (pass) => {
    let strength = 0;
    if (pass.length >= 8) strength++;
    if (/[A-Z]/.test(pass)) strength++;
    if (/[a-z]/.test(pass)) strength++;
    if (/\d/.test(pass)) strength++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(pass)) strength++;
    return strength;
  };

  const strength = getStrength(password);

  const getStrengthText = (strength) => {
    if (strength === 0) return 'Very Weak';
    if (strength === 1) return 'Weak';
    if (strength === 2) return 'Moderate';
    if (strength === 3) return 'Fair';
    if (strength === 4) return 'Strong';
    return 'Very Strong';
  };

  const getColor = (strength) => {
    if (strength === 0) return 'bg-red-500';
    if (strength === 1) return 'bg-orange-500';
    if (strength === 2) return 'bg-yellow-500';
    if (strength === 3) return 'bg-blue-500';
    if (strength === 4) return 'bg-purple-500';
    return 'bg-green-500';
  };

  const getTextColor = (strength) => {
    if (strength === 0) return 'text-red-500';
    if (strength === 1) return 'text-orange-500';
    if (strength === 2) return 'text-yellow-500';
    if (strength === 3) return 'text-blue-500';
    if (strength === 4) return 'text-purple-500';
    return 'text-green-500';
  };

  // Don't show anything if password is empty
  //if (!password) return null;

  return (
    <div className="mt-2">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs text-gray-500">Password Strength</span>
        <span className={`text-xs font-medium ${getTextColor(strength)}`}>
          {getStrengthText(strength)}
        </span>
      </div>

      <div className="flex space-x-1 mb-2">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className={`h-1.5 w-full rounded-full transition-all duration-300 ${
              index < strength ? getColor(strength) : 'bg-gray-200'
            }`}
          ></div>
        ))}
      </div>
      
      <PasswordCriteria password={password} />
    </div>
  );
};

export default PasswordStrengthMeter;