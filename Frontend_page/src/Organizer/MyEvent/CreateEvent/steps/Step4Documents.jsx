import React, { useState, useEffect } from "react";
import {
  Upload,
  X,
  FileText,
  Image as ImageIcon,
  Video,
  Trash2,
  Check,
  AlertCircle,
} from "lucide-react";

const Step4Documents = ({ formData, setFormData }) => {
  const [bannerType, setBannerType] = useState("image");
  const [docType, setDocType] = useState("");
  const [docNumber, setDocNumber] = useState("");
  const [docPreview, setDocPreview] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [dragActiveBanner, setDragActiveBanner] = useState(false);

  // =========================
  // 🔥 BANNER UPLOAD
  // =========================
  const handleBannerUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const previewURL = URL.createObjectURL(file);

    setFormData({
      ...formData,
      documents: {
        ...formData.documents,
        banner: file,
        bannerPreview: previewURL,
      },
    });
  };

  const handleBannerDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActiveBanner(true);
    } else if (e.type === "dragleave") {
      setDragActiveBanner(false);
    }
  };

  const handleBannerDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActiveBanner(false);

    const file = e.dataTransfer.files[0];
    if (!file) return;

    const previewURL = URL.createObjectURL(file);
    setFormData({
      ...formData,
      documents: {
        ...formData.documents,
        banner: file,
        bannerPreview: previewURL,
      },
    });
  };

  // =========================
  // 🔥 DOCUMENT UPLOAD
  // =========================
  const handleDocUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const previewURL = URL.createObjectURL(file);

    setDocPreview({
      file,
      preview: previewURL,
    });
  };

  const handleDocDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDocDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files[0];
    if (!file) return;

    const previewURL = URL.createObjectURL(file);
    setDocPreview({
      file,
      preview: previewURL,
    });
  };

  // =========================
  // 🔥 ADD DOCUMENT
  // =========================
  const addDocument = () => {
    if (!docPreview || !docType || !docNumber) {
      alert("Please fill all fields");
      return;
    }

    const newDoc = {
      type: docType,
      number: docNumber,
      file: docPreview.file,
      preview: docPreview.preview,
    };

    const updatedDocs = [...(formData.documents.docs || []), newDoc];

    setFormData({
      ...formData,
      documents: {
        ...formData.documents,
        docs: updatedDocs,
      },
    });

    setDocType("");
    setDocNumber("");
    setDocPreview(null);
  };

  // =========================
  // 🔥 DELETE DOCUMENT
  // =========================
  const removeDoc = (index) => {
    const updatedDocs = formData.documents.docs.filter((_, i) => i !== index);

    setFormData({
      ...formData,
      documents: {
        ...formData.documents,
        docs: updatedDocs,
      },
    });
  };

  // cleanup memory
  useEffect(() => {
    return () => {
      if (docPreview?.preview) {
        URL.revokeObjectURL(docPreview.preview);
      }
    };
  }, [docPreview]);

  const getDocumentIcon = (type) => {
    switch (type) {
      case "Aadhar":
        return "🇮🇳";
      case "PAN":
        return "📋";
      case "Passport":
        return "🛂";
      default:
        return "📄";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Documents & Media
          </h1>
          <p className="text-gray-600">
            Upload your banner and important documents
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* ========================= */}
          {/* 🔥 BANNER SECTION */}
          {/* ========================= */}
          <div className="group">
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-1"></div>

              <div className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    {bannerType === "image" ? (
                      <ImageIcon className="w-5 h-5 text-blue-600" />
                    ) : (
                      <Video className="w-5 h-5 text-blue-600" />
                    )}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Banner
                  </h2>
                </div>

                {/* Toggle */}
                <div className="flex items-center gap-4 mb-8 p-3 bg-gray-50 rounded-lg">
                  <label className="flex items-center gap-2 cursor-pointer group/label">
                    <input
                      type="radio"
                      checked={bannerType === "image"}
                      onChange={() => setBannerType("image")}
                      className="w-4 h-4 accent-blue-600"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Image
                    </span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer group/label">
                    <input
                      type="radio"
                      checked={bannerType === "video"}
                      onChange={() => setBannerType("video")}
                      className="w-4 h-4 accent-blue-600"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Video
                    </span>
                  </label>
                </div>

                {/* Upload Area */}
                <label
                  className={`relative block border-2 border-dashed rounded-xl p-8 transition-all duration-200 cursor-pointer ${
                    dragActiveBanner
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-blue-400 hover:bg-blue-50"
                  }`}
                  onDragEnter={handleBannerDrag}
                  onDragLeave={handleBannerDrag}
                  onDragOver={handleBannerDrag}
                  onDrop={handleBannerDrop}
                >
                  {!formData.documents.bannerPreview ? (
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className="p-3 bg-blue-100 rounded-full">
                        <Upload className="w-6 h-6 text-blue-600" />
                      </div>
                      <span className="text-sm font-semibold text-gray-900">
                        Drop your{" "}
                        {bannerType === "image" ? "image" : "video"} here
                      </span>
                      <span className="text-xs text-gray-500">
                        or click to browse
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-3">
                      {/* IMAGE */}
                      {bannerType === "image" && (
                        <img
                          src={formData.documents.bannerPreview}
                          className="h-48 rounded-lg object-cover shadow-md"
                          alt="Banner preview"
                        />
                      )}

                      {/* VIDEO */}
                      {bannerType === "video" && (
                        <video
                          src={formData.documents.bannerPreview}
                          controls
                          className="h-48 rounded-lg shadow-md"
                        />
                      )}

                      <button
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            documents: {
                              ...formData.documents,
                              banner: null,
                              bannerPreview: null,
                            },
                          })
                        }
                        className="text-xs text-blue-600 hover:text-blue-700 font-medium mt-2"
                      >
                        Change {bannerType}
                      </button>
                    </div>
                  )}

                  <input
                    type="file"
                    className="hidden"
                    accept={
                      bannerType === "image" ? "image/*" : "video/*"
                    }
                    onChange={handleBannerUpload}
                  />
                </label>

                {formData.documents.bannerPreview && (
                  <div className="flex items-center gap-2 mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-green-800">
                      {bannerType === "image"
                        ? "Image"
                        : "Video"}{" "}
                      uploaded successfully
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ========================= */}
          {/* 🔥 DOCUMENTS SECTION */}
          {/* ========================= */}
          <div className="group">
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 h-1"></div>

              <div className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-indigo-100 rounded-lg">
                    <FileText className="w-5 h-5 text-indigo-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Documents
                  </h2>
                </div>

                {/* Form Inputs */}
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Document Type
                    </label>
                    <select
                      value={docType}
                      onChange={(e) => setDocType(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors text-gray-900 bg-white"
                    >
                      <option value="">Select a type</option>
                      <option value="Aadhar">🇮🇳 Aadhar</option>
                      <option value="PAN">📋 PAN</option>
                      <option value="Passport">🛂 Passport</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Document Number
                    </label>
                    <input
                      type="text"
                      placeholder="Enter document number"
                      value={docNumber}
                      onChange={(e) => setDocNumber(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Upload Area */}
                <label
                  className={`relative block border-2 border-dashed rounded-xl p-8 transition-all duration-200 cursor-pointer ${
                    dragActive
                      ? "border-indigo-500 bg-indigo-50"
                      : "border-gray-200 hover:border-indigo-400 hover:bg-indigo-50"
                  }`}
                  onDragEnter={handleDocDrag}
                  onDragLeave={handleDocDrag}
                  onDragOver={handleDocDrag}
                  onDrop={handleDocDrop}
                >
                  {!docPreview ? (
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className="p-3 bg-indigo-100 rounded-full">
                        <Upload className="w-6 h-6 text-indigo-600" />
                      </div>
                      <span className="text-sm font-semibold text-gray-900">
                        Drop file here
                      </span>
                      <span className="text-xs text-gray-500">
                        Images or PDF
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-3">
                      {/* IMAGE */}
                      {docPreview.file.type !== "application/pdf" ? (
                        <img
                          src={docPreview.preview}
                          className="h-32 rounded-lg object-cover shadow-md"
                          alt="Document preview"
                        />
                      ) : (
                        <div className="flex items-center justify-center w-32 h-32 bg-red-50 rounded-lg border-2 border-red-200">
                          <FileText className="w-12 h-12 text-red-500" />
                        </div>
                      )}

                      <p className="text-sm font-medium text-gray-700 text-center truncate max-w-xs">
                        {docPreview.file.name}
                      </p>

                      <button
                        type="button"
                        onClick={() => setDocPreview(null)}
                        className="text-xs text-indigo-600 hover:text-indigo-700 font-medium"
                      >
                        Change file
                      </button>
                    </div>
                  )}

                  <input
                    type="file"
                    className="hidden"
                    accept="image/*,application/pdf"
                    onChange={handleDocUpload}
                  />
                </label>

                {/* Add Button */}
                <button
                  onClick={addDocument}
                  disabled={!docPreview || !docType || !docNumber}
                  className="w-full mt-6 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-semibold py-3 px-4 rounded-lg hover:from-indigo-700 hover:to-indigo-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  Add Document
                </button>

                {/* Documents List */}
                <div className="mt-8">
                  <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-3">
                    Uploaded Documents ({(formData.documents.docs || []).length})
                  </p>

                  {(formData.documents.docs || []).length === 0 ? (
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-center">
                      <AlertCircle className="w-5 h-5 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">
                        No documents added yet
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {(formData.documents.docs || []).map((doc, index) => (
                        <div
                          key={index}
                          className="group/item p-4 border-2 border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-200 flex items-center justify-between"
                        >
                          <div className="flex items-center gap-4 flex-1 min-w-0">
                            {/* Thumbnail */}
                            <div className="flex-shrink-0">
                              {doc.file.type !== "application/pdf" ? (
                                <img
                                  src={doc.preview}
                                  className="h-12 w-12 rounded-lg object-cover shadow-sm"
                                  alt={doc.type}
                                />
                              ) : (
                                <div className="flex items-center justify-center h-12 w-12 bg-red-50 rounded-lg border border-red-200">
                                  <FileText className="w-6 h-6 text-red-500" />
                                </div>
                              )}
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="text-lg">
                                  {getDocumentIcon(doc.type)}
                                </span>
                                <p className="font-semibold text-gray-900">
                                  {doc.type}
                                </p>
                              </div>
                              <p className="text-sm text-gray-600 truncate">
                                {doc.number}
                              </p>
                            </div>
                          </div>

                          {/* Delete Button */}
                          <button
                            onClick={() => removeDoc(index)}
                            className="ml-4 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 opacity-0 group-hover/item:opacity-100"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step4Documents;