import { Input, Typography } from "@material-tailwind/react";
import React from "react";
import { AiFillExclamationCircle } from "react-icons/ai";

// eslint-disable-next-line react/display-name
const TextInput = React.forwardRef(
  (
    {
      type,
      placeHolder,
      description,
      required,
      styles,
      label,
      register,
      name,
      error,
      labelStyle,
      onChange,
      rules,
      value,
      onblur,
      oninput,
      vl,
      readOnly,
    },
    ref
  ) => {
    var styleLabel = "block leading-8 text-gray-900 font-medium";
    if (labelStyle) {
      styleLabel = labelStyle;
    }
    return (
      <div className="flex flex-col ">
        <Typography
          variant="small"
          color="blue-gray"
          className="mb-1 text-left font-medium"
        >
          <label className="align-middle mr-1 text-[#FF4949] font-bold">
            {required ? "*" : ""}
          </label>
          {label}
        </Typography>
        {/* <p className={styleLabel}></p> */}
        <p className="text-xs text-[#6F6F6F] italic">{description}</p>
        <div className="relative rounded-sm">
          <Input
            type={type}
            name={name}
            color="gray"
            size="lg"
            placeholder={placeHolder}
            onInput={oninput}
            onChange={onChange}
            rules={rules}
            containerProps={{
              className: "!min-w-full",
            }}
            onBlur={onblur}
            ref={ref}
            value={vl}
            defaultValue={value}
            className={`placeholder:opacity-100 focus:!border-t-gray-900 ${styles}`}
            {...register}
            style={{
              borderColor: `${error ? "#a9252b" : ""}`,
              outlineColor: `${error ? "#a9252b" : ""}`,
            }}
            // labelProps={{
            //   className: "hidden",
            // }}
            aria-invalid={error ? "true" : "false"}
            readOnly={readOnly}
          />
          {error && (
            <span className="flex flex-row items-center text-sm text-[#a9252b] mt-2">
              <AiFillExclamationCircle className="mr-1" />
              {error}
            </span>
          )}
        </div>
      </div>
    );
  }
);

export default TextInput;
