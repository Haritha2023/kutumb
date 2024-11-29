import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const CreateQuote = () => {
  // Use a single useState to store the entire form's data
  const [formData, setFormData] = useState({
    username: '',
    text: '',
    mediaUrl: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [file, setFile] = useState(null); 
  const location = useLocation();
  const { token } = location.state || {}; // Retrieve token from route state

  useEffect(() => {
    if (!token) {
      // Handle error if token is not passed
      alert('Token is missing!');
      return;
    }
  }, [token]);

  console.log(token)
  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData, // Keep the previous state
      [name]: value // Update the specific field
    });
  };
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile); // Store the file in state
  };
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('https://crafto.app/crafto/v1.0/media/assignment/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Image upload failed');
      }

      const data = await response.json();
      return data.mediaUrl; // The media URL returned from the upload API
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Image upload failed');
      return null;
    }
  };
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
    setIsSubmitting(true);
    // If a file is selected, upload it first
    let mediaUrl = formData.mediaUrl;
    if (file) {
      mediaUrl = await uploadImage(file); // Upload image and get the media URL
    }

  
    const apiUrl = 'https://assignment.stage.crafto.app/postQuote';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: formData.text,
          mediaUrl: mediaUrl
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit quote');
      }

      // If the request is successful, reset the form
      alert('Quote submitted successfully!');
      setFormData({
        username : '',
        text: '',
        mediaUrl: ''
      });
    } catch (error) {
      console.error('Error submitting quote:', error);
      alert('There was an error submitting the quote.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Create a Quote</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Username Field */}
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            id="username"
            name="username" // Name attribute to match the state field
            value={formData.username}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        {/* Quote Text Field */}
        <div>
          <label htmlFor="text" className="block text-sm font-medium text-gray-700">Quote Text</label>
          <textarea
            id="text"
            name="text" // Name attribute to match the state field
            value={formData.text}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            rows="4"
            required
          ></textarea>
        </div>

        {/* Media URL Field */}
        <div>
          <label htmlFor="mediaUrl" className="block text-sm font-medium text-gray-700">Media URL (Optional)</label>
          <input
            type="url"
            id="mediaUrl"
            name="mediaUrl" // Name attribute to match the state field
            value={formData.mediaUrl}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 disabled:bg-indigo-400"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Quote'}
        </button>
      </form>
    </div>
  );
};

export default CreateQuote;