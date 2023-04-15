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

  // Use useEffect to validate the form whenever user info or touch events change
  useEffect(() => {
    // Define a function to validate the user info and set errors
    const validate = (): boolean => {
      const newErrors: IErrors = {};

      if (touched.firstname && !userInfo.firstname?.trim()) {
        newErrors.firstname = 'Please enter your first name.';
      }
      if (touched.lastname && !userInfo.lastname?.trim()) {
        newErrors.lastname = 'Please enter your last name.';
      }
      if (touched.username && !userInfo.username?.trim()) {
        newErrors.username = 'Please enter a username.';
      }
      if (touched.email && !userInfo.email?.trim()) {
        newErrors.email = 'Please enter your email address.';
      } else if (
        touched.email &&
        !/\S+@\S+\.\S+/.test(userInfo.email as string)
      ) {
        newErrors.email = 'Please enter a valid email address.';
      }
      if (touched.password && !userInfo.password?.trim()) {
        newErrors.password = 'Please enter a password.';
      } else if (touched.password && Number(userInfo.password?.length) < 8) {
        newErrors.password = 'Password must be at least 8 characters long.';
      } else if (touched.password && !/\d/.test(userInfo.password as string)) {
        newErrors.password = 'Password must contain at least one digit.';
      } else if (
        touched.password &&
        !/[!@#$%^&*]/.test(userInfo.password as string)
      ) {
        newErrors.password =
          'Password must contain at least one special character';
      }
      if (touched.repeat_password && !userInfo.repeat_password?.trim()) {
        newErrors.repeat_password = 'Please repeat your password.';
      } else if (
        touched.repeat_password &&
        userInfo.password !== userInfo.repeat_password
      ) {
        newErrors.repeat_password = 'Passwords do not match.';
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    setIsValid(validate());
  }, [userInfo, touched]);

  return [
    userInfo,
    errors,
    isValid,
    { onBlur: handleBlur, onChange: handleChange },
  ];
};
