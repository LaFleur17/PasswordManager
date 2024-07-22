import React, { useState, useEffect, useCallback, useMemo } from "react";
import { updatePassword } from "../services/api";

const Passwordcard = ({ data, onClose, authHeader, setData }) => {
  if (!data) return null;

  const initialState = useMemo(
    () => ({
      service: data.service,
      username: data.username,
      url: data.url,
      tags: data.tags.join(", "),
      password: data.password,
      comments: data.comments,
      sharedWith: data.sharedWith?.join(", ") || "",
    }),
    [data]
  );

  const [editData, setEditData] = useState(initialState);
  const [editable, setEditable] = useState(false);
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    setEditData(initialState);
  }, [data, initialState]);

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
    setEditData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  const handleTagInputChange = (event) => {
    setTagInput(event.target.value);
  };

  const handleTagInputKeyDown = (event) => {
    if (event.key === "Enter" && tagInput) {
      event.preventDefault();
      const newTags = editData.tags.split(", ").filter(Boolean);
      if (!newTags.includes(tagInput.trim())) {
        setEditData({
          ...editData,
          tags: [...newTags, tagInput.trim()].join(", "),
        });
      }
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove) => {
    const newTags = editData.tags
      .split(", ")
      .filter((tag) => tag !== tagToRemove);
    setEditData({
      ...editData,
      tags: newTags.join(", "),
    });
  };

  const handleUpdate = useCallback(
    async (event) => {
      event.preventDefault();
      try {
        const fieldsToUpdate = {};
        Object.keys(editData).forEach((key) => {
          if (key === "tags" || key === "sharedWith") {
            if (
              editData[key]
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean)
                .join(", ") !== data[key].join(", ")
            ) {
              fieldsToUpdate[key] = editData[key]
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean);
            }
          } else if (editData[key] !== data[key]) {
            fieldsToUpdate[key] = editData[key];
          }
        });

        if (Object.keys(fieldsToUpdate).length > 0) {
          await updatePassword(data._id, fieldsToUpdate, authHeader);
          setData((prevData) => {
            const newData = [...prevData];
            const index = newData.findIndex(
              (password) => password._id === data._id
            );
            if (index !== -1) {
              newData[index] = { ...newData[index], ...fieldsToUpdate };
            }
            return newData;
          });
          setEditable(false);
        } else {
          console.log("Aucun champ n'a été modifié.");
        }
      } catch (error) {
        console.error("Erreur lors de la mise à jour du mot de passe:", error);
      }
    },
    [editData, data, authHeader, setData]
  );

  const toggleEditable = () => {
    setEditable(!editable);
  };

  return (
    <div className="add-form">
      <button onClick={onClose}>|X|</button>
      <form onSubmit={handleUpdate} className="form-fields">
        <div className="form-field">
          <label htmlFor="service">Service</label>
          <input
            name="service"
            value={editData.service}
            onChange={handleChange}
            readOnly={!editable}
          />
        </div>
        <div className="form-field">
          <label htmlFor="username">Username</label>
          <input
            name="username"
            value={editData.username}
            onChange={handleChange}
            readOnly={!editable}
          />
        </div>
        <div className="form-field">
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            value={editData.password}
            onChange={handleChange}
            readOnly={!editable}
          />
        </div>
        <div className="form-field">
          <label htmlFor="tags">Tags</label>
          {editable ? (
            <>
              <input
                name="tags"
                value={tagInput}
                onChange={handleTagInputChange}
                onKeyDown={handleTagInputKeyDown}
                placeholder="Press Enter to add a tag"
              />
              <div className="tags-container">
                {editData.tags.split(", ").map((tag, index) => (
                  <span key={index} className="tag">
                    {tag}
                    <button type="button" onClick={() => removeTag(tag)}>
                      x
                    </button>
                  </span>
                ))}
              </div>
            </>
          ) : (
            <input
              name="tags"
              value={editData.tags}
              onChange={handleChange}
              readOnly={!editable}
            />
          )}
        </div>
        <div className="form-field">
          <label htmlFor="url">URL</label>
          <input
            name="url"
            value={editData.url}
            onChange={handleChange}
            readOnly={!editable}
          />
        </div>
        <div className="form-field">
          <label htmlFor="comments">Comments</label>
          <input
            name="comments"
            value={editData.comments}
            onChange={handleChange}
            readOnly={!editable}
          />
        </div>
        <button type="button" onClick={toggleEditable}>
          {editable ? "Lock" : "Edit"}
        </button>
        {editable && (
          <button type="submit" className="cta-button">
            Update
          </button>
        )}
      </form>
    </div>
  );
};

export default Passwordcard;
