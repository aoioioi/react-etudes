import useInput from '../../hooks/useInput';
import classes from './Checkout.module.css';

function Checkout(props) {
  const isNotEmpty = value => value.trim() !== '';
  // const isPostcode = value => value.trim().length === 5;

  const {
    value: name,
    isValid: nameIsValid,
    hasError: nameHasError,
    handleValueChange: handleNameChange,
    handleInputBlur: handleNameBlur,
    reset: resetName
  } = useInput(isNotEmpty);

  const {
    value: address,
    isValid: addressIsValid,
    hasError: addressHasError,
    handleValueChange: handleAddressChange,
    handleInputBlur: handleAddressBlur,
    reset: resetAddress
  } = useInput(isNotEmpty);

  const {
    value: city,
    isValid: cityIsValid,
    hasError: cityHasError,
    handleValueChange: handleCityChange,
    handleInputBlur: handleCityBlur,
    reset: resetCity
  } = useInput(isNotEmpty);

  const {
    value: postcode,
    isValid: postcodeIsValid,
    hasError: postcodeHasError,
    handleValueChange: handlePostcodeChange,
    handleInputBlur: handlePostcodeBlur,
    reset: resetPostcode
  } = useInput(isNotEmpty);

  let formIsValid = false;
  if (nameIsValid && addressIsValid && cityIsValid && postcodeIsValid) {
    formIsValid = true;
  }

  function handleSubmit(e) {
    e.preventDefault();

    const customerInfo = {
      name: name,
      address: address,
      city: city,
      postcode: postcode
    }

    props.onAddCustomer(customerInfo);

    resetName('');
    resetAddress('');
    resetCity('');
    resetPostcode('');
  }

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <h4>Enter Customer Details</h4>
      <div className={classes.control}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={handleNameChange}
          onBlur={handleNameBlur}
        />
      </div>
      <div className={classes.control}>
        <label htmlFor="address">Address</label>
        <input
          type="text"
          id="address"
          value={address}
          onChange={handleAddressChange}
          onBlur={handleAddressBlur}
        />
      </div>
      <div className={classes.control}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          value={city}
          onChange={handleCityChange}
          onBlur={handleCityBlur}
        />
      </div>
      <div className={classes.control}>
        <label htmlFor="postcode">Postcode</label>
        <input
          type="text"
          id="postcode"
          value={postcode}
          onChange={handlePostcodeChange}
          onBlur={handlePostcodeBlur}
        />
      </div>
      {(nameHasError || addressHasError || cityHasError || postcodeHasError) && (
        <p>All fields required.</p>
      )}
      <div className={classes.actions}>
        <button type="button" onClick={props.cancelCheckout}>Cancel</button>
        <button className={!formIsValid ? 'button-disabled' : classes.submit} disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
}

export default Checkout;