'use client';

import { useState } from 'react';

export function FormInput({ label, type = 'text', placeholder = '', className = '', ...props }) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className={`w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow ${className}`}
        {...props}
      />
    </div>
  );
}

export function FormTextarea({ label, placeholder = '', className = '', ...props }) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <textarea
        placeholder={placeholder}
        className={`w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow resize-none ${className}`}
        {...props}
      />
    </div>
  );
}

export function FormSelect({ label, options = [], className = '', ...props }) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <select
        className={`w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow ${className}`}
        {...props}
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function ImageUpload({ label, onImageSelect }) {
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && onImageSelect) {
      const reader = new FileReader();
      reader.onload = (e) => onImageSelect(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div className="w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl flex items-center justify-center">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Drop an image here or click to upload
          </span>
        </div>
      </div>
    </div>
  );
}

export function TagInput({ label, tags = [], onTagsChange }) {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const newTag = inputValue.trim();
      if (newTag && !tags.includes(newTag)) {
        onTagsChange([...tags, newTag]);
      }
      setInputValue('');
    } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      onTagsChange(tags.slice(0, -1));
    }
  };

  const removeTag = (tagToRemove) => {
    onTagsChange(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <div className="flex flex-wrap gap-2 p-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-sm"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="hover:text-purple-800 dark:hover:text-purple-300"
            >
              ×
            </button>
          </span>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 min-w-[120px] bg-transparent border-none focus:outline-none text-gray-900 dark:text-white placeholder-gray-400"
          placeholder="Type and press Enter to add tags"
        />
      </div>
    </div>
  );
}

export function SubmitButton({ children, loading = false, ...props }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className={`w-full px-6 py-3 text-white font-semibold rounded-xl transition-all ${
        loading
          ? 'bg-gray-400 cursor-not-allowed'
          : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
      }`}
      {...props}
    >
      {loading ? 'Processing...' : children}
    </button>
  );
}