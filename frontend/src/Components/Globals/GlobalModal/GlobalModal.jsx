import React, { useEffect, useRef, useState } from "react";
import { Modal, Button, CloseButton } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import "./GlobalModal.css";
import { Loader, Upload } from "lucide-react";
import DatePicker from "react-datepicker";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import "react-datepicker/dist/react-datepicker.css";

const GlobalModal = ({
  show,
  close,
  loading,
  modalFor,
  fields = [],
  onSubmit,
  editModal,
  existingData,
  dropdownList,
  employeeNames,
  loadingDropdown,
  termsAndConditionsCheck,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    control,
  } = useForm({ mode: "onChange" });

  // Dynamic map to store file names by field name
  const [fileNames, setFileNames] = useState({});
  const fileInputRefs = useRef({});

  useEffect(() => {
    if (show && editModal && existingData) {
      Object.entries(existingData).forEach(([key, value]) => {
        setValue(key, value, { shouldValidate: true, shouldDirty: true });

        // If existing field is file URL, store filename dynamically
        const fileField = fields.find(
          (f) => f.type === "file" && f.name === key
        );
        if (fileField && typeof value === "string") {
          setFileNames((prev) => ({
            ...prev,
            [key]: value.split("/").pop(),
          }));
        }
      });
    }
  }, [show, editModal, existingData, setValue, fields]);

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileNames((prev) => ({
        ...prev,
        [fieldName]: file.name,
      }));
      setValue(fieldName, file, { shouldValidate: true });
    }
  };

  const handleClick = (fieldName) => {
    fileInputRefs.current[fieldName]?.click();
  };
  return (
    <Modal show={show} className="main-modal" onHide={close} size="lg" centered>
      <Modal.Header className="modal-heading">
        <Modal.Title className="centered-title">{modalFor}</Modal.Title>
        <CloseButton onClick={close} style={{ filter: "invert(1)" }} />
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={handleSubmit(onSubmit)} className="custom-form">
          {fields.map((field, idx) => (
            <div className="form-group" key={idx}>
              <label>{field.label || `Field ${idx + 1}`}</label>

              {field.type === "file" ? (
                <div className="file-field-wrapper">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif"
                    {...register(field.name, { required: true })}
                    ref={(e) => {
                      fileInputRefs.current[field.name] = e;
                    }}
                    onChange={(e) => handleFileChange(e, field.name)}
                    className="file-input-hidden"
                  />

                  <div
                    className="file-display-input"
                    onClick={() => handleClick(field.name)}
                  >
                    <span>
                      {fileNames[field.name] || `${field.label || "File"}*`}
                    </span>

                    {fileNames[field.name] ? (
                      <span
                        className="icon-clear"
                        onClick={(e) => {
                          e.stopPropagation();
                          setFileNames((prev) => ({
                            ...prev,
                            [field.name]: "",
                          }));
                          fileInputRefs.current[field.name].value = "";
                          setValue(field.name, null, { shouldValidate: true });
                        }}
                      >
                        <CloseButton />
                      </span>
                    ) : (
                      <span className="icon-upload">
                        <Upload />
                      </span>
                    )}
                  </div>
                </div>
              ) : field.type === "dropdown" ? (
                <div style={{ width: "100%" }}>
                  <select
                    style={{
                      width: "100%",
                      padding: "8px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      fontSize: "14px",
                    }}
                    {...register(field.name, { required: true })}
                    defaultValue={""}
                  >
                    <option value="" disabled>
                      Select an option
                    </option>
                    {dropdownList?.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {errors[field.name] && (
                    <span className="error">This field is required</span>
                  )}
                </div>
              ) : field.type === "calender" ? (
                <div className="datepicker-container">
                  <Controller
                    name={field.name}
                    control={control}
                    rules={{ required: true }}
                    defaultValue={null}
                    render={({ field: { onChange, value } }) => (
                      <DatePicker
                        selected={value}
                        onChange={(date) => onChange(date)}
                        dateFormat="dd/MM/yy"
                        className="custom-datepicker-input"
                        calendarClassName="custom-datepicker-calendar"
                        placeholderText="Select date"
                      />
                    )}
                  />
                </div>
              ) : field.type === "autocomplete" ? (
                <Controller
                  name={field.name}
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <Typeahead
                      disabled={loadingDropdown}
                      id={`autocomplete-${field.name}`}
                      labelKey={(option) => option?.name}
                      onChange={(selected) => {
                        onChange(selected[0] || "");
                      }}
                      options={employeeNames}
                      selected={value ? [value] : []}
                      placeholder="Search name..."
                      clearButton
                    />
                  )}
                />
              ) : (
                <input
                  type={field.type || "text"}
                  {...register(field.name, { required: true })}
                />
              )}

              {errors[field.name] && (
                <span className="error">This field is required</span>
              )}
            </div>
          ))}
          {termsAndConditionsCheck && (
            <div className="terms-conditions">
              <label htmlFor="terms" className="checkbox-label">
                <input
                  type="checkbox"
                  id="terms"
                  {...register("terms", {
                    required: "You must accept the terms",
                  })}
                />
                I hereby declare that the above information is true to the best
                of my knowledge and belief
              </label>
            </div>
          )}

          <div className="centered-button">
            <Button
              type="submit"
              disabled={!isValid || loading}
              style={{
                backgroundColor: isValid ? "#4D007D" : "gray",
                color: "white",
                cursor: isValid ? "pointer" : "not-allowed",
              }}
            >
              {loading ? <Loader /> : "Save"}
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default GlobalModal;
