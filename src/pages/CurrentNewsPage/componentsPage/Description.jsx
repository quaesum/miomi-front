import React from "react";

export const Description = ({
  register,
  isEditMode,
}) => {
  return (
    <>
      <textarea
        rows={4}
        {...register("description")}
        className="resize-none w-full border-3 outline-0 rounded-lg p-6 cursor-default font-normal leading-6"
        readOnly={!isEditMode}
      />
    </>
  );
};
