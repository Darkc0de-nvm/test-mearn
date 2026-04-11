const FormRow = ({ type, labelText, name, defaultValue, onChange }) => {
  return (
    <div className="form-row">
      <label htmlFor="name" className="form-label">
        {labelText || "name"}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        className="form-input"
        defaultValue={defaultValue}
        required
        placeholder={`Введіть ${labelText || name}...`}
        onChange={onChange}
      />
    </div>
  );
};
export default FormRow;
