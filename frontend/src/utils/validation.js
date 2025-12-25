// Validation utility functions

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validatePassword = (password) => {
  // At least 6 characters
  return password && password.length >= 6;
};

export const validateUsername = (username) => {
  // 3-20 chars, alphanumeric and underscore only
  const regex = /^[a-zA-Z0-9_]{3,20}$/;
  return regex.test(username);
};

export const validateFullName = (name) => {
  // At least 2 characters, no numbers
  return name && name.trim().length >= 2 && !/\d/.test(name);
};

export const validateVideoTitle = (title) => {
  return title && title.trim().length >= 3 && title.trim().length <= 100;
};

export const validateVideoDescription = (description) => {
  return description && description.trim().length >= 10 && description.trim().length <= 5000;
};

export const validateComment = (content) => {
  return content && content.trim().length >= 1 && content.trim().length <= 500;
};

export const getValidationError = (field, value) => {
  switch (field) {
    case "email":
      if (!value) return "Email is required";
      if (!validateEmail(value)) return "Please enter a valid email";
      return "";
    
    case "password":
      if (!value) return "Password is required";
      if (!validatePassword(value)) return "Password must be at least 6 characters";
      return "";
    
    case "username":
      if (!value) return "Username is required";
      if (!validateUsername(value)) return "Username: 3-20 chars, alphanumeric and underscore only";
      return "";
    
    case "fullName":
      if (!value) return "Full name is required";
      if (!validateFullName(value)) return "Full name must be at least 2 characters, no numbers";
      return "";
    
    case "title":
      if (!value) return "Title is required";
      if (!validateVideoTitle(value)) return "Title must be 3-100 characters";
      return "";
    
    case "description":
      if (!value) return "Description is required";
      if (!validateVideoDescription(value)) return "Description must be 10-5000 characters";
      return "";
    
    case "comment":
      if (!value) return "Comment cannot be empty";
      if (!validateComment(value)) return "Comment must be 1-500 characters";
      return "";
    
    default:
      return "";
  }
};
