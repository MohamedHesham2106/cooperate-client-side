import { useCallback, useEffect, useState } from 'react';

interface IErrors {
  firstname?: string;
  lastname?: string;
  username?: string;
  email?: string;
  password?: string;
  repeat_password?: string;
}

interface IValidate {
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const useValidate = (
  initialUserInfo: IRegister
): [IRegister, IErrors, boolean, IValidate] => {
  // Define state variables for user info, validity, errors, and touch events
  const [userInfo, setUserInfo] = useState<IRegister>(initialUserInfo);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [errors, setErrors] = useState<IErrors>({});
  const [touched, setTouched] = useState<IErrors>({});

  // Handle onBlur events to track which fields have been touched
  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name } = event.target;
    setTouched((prevTouched) => ({ ...prevTouched, [name]: true }));
  };

  // Handle onChange events to update the user info state
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserInfo((prevUserInfo) => ({ ...prevUserInfo, [name]: value }));
  };

  const validateField = (
    name: string | undefined,
    fieldName: string | undefined
  ): string => {
    if (!name?.trim()) {
      return `Please enter your ${fieldName}.`;
    }
    return '';
  };

  const validateEmail = (email: string | undefined): string => {
    if (!email?.trim()) {
      return 'Please enter your email address.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      return 'Please enter a valid email address.';
    }
    return '';
  };

  const validatePassword = (password: string | undefined): string => {
    if (!password?.trim()) {
      return 'Please enter a password.';
    } else if (password.length < 8) {
      return 'Password must be at least 8 characters long.';
    } else if (!/\d/.test(password)) {
      return 'Password must contain at least one digit.';
    } else if (!/[!@#$%^&*]/.test(password)) {
      return 'Password must contain at least one special character';
    }
    return '';
  };

  const validateRepeatPassword = (
    password: string | undefined,
    repeatPassword: string | undefined
  ): string => {
    if (!repeatPassword?.trim()) {
      return 'Please repeat your password.';
    } else if (password !== repeatPassword) {
      return 'Passwords do not match.';
    }
    return '';
  };

  const validate = useCallback((): boolean => {
    const newErrors: IErrors = {};

    if (touched.firstname) {
      newErrors.firstname = validateField(userInfo.firstname, 'first name');
    }
    if (touched.lastname) {
      newErrors.lastname = validateField(userInfo.lastname, 'last name');
    }
    if (touched.username) {
      newErrors.username = validateField(userInfo.username, 'username');
    }
    if (touched.email) {
      newErrors.email = validateEmail(userInfo.email);
    }
    if (touched.password) {
      newErrors.password = validatePassword(userInfo.password);
    }
    if (touched.repeat_password) {
      newErrors.repeat_password = validateRepeatPassword(
        userInfo.password,
        userInfo.repeat_password
      );
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [
    touched.email,
    touched.firstname,
    touched.lastname,
    touched.password,
    touched.repeat_password,
    touched.username,
    userInfo.email,
    userInfo.firstname,
    userInfo.lastname,
    userInfo.password,
    userInfo.repeat_password,
    userInfo.username,
  ]);
  // Use useEffect to validate the form whenever user info or touch events change
  useEffect(() => {
    setIsValid(validate());
  }, [userInfo, touched, validate]);

  return [
    userInfo,
    errors,
    isValid,
    { onBlur: handleBlur, onChange: handleChange },
  ];
};
