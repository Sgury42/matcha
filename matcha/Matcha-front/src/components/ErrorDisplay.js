import React from 'react';

const ErrorDisplay = ({ errors }) => {
  var errorsArray = Object.keys(errors);
  return (
    errorsArray.map((error, key) => (
        <p key={error.toString()}>{ errors[error]} </p>
      )
  )
);
}

export default ErrorDisplay;