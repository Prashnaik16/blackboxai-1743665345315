import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

interface FormData {
  name: string;
  platform: string;
  audienceSize: string;
  categories: string[];
  engagementRate: string;
  preferredBrands: string[];
}

const InfluencerForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    platform: '',
    audienceSize: '',
    categories: [],
    engagementRate: '',
    preferredBrands: []
  });

  const platforms = ['Instagram', 'YouTube', 'TikTok', 'Twitter', 'Facebook'];
  const categories = ['Fashion', 'Beauty', 'Tech', 'Fitness', 'Food', 'Travel'];
  const engagementRates = ['<1%', '1-3%', '3-5%', '5-10%', '>10%'];

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCategorySelect = (category: string) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between mb-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center 
                ${step >= i ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                {i}
              </div>
              <span className={`text-sm mt-2 ${step >= i ? 'text-blue-600' : 'text-gray-500'}`}>
                {i === 1 ? 'Profile' : i === 2 ? 'Audience' : 'Preferences'}
              </span>
            </div>
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Basic Information</h2>
            <div>
              <label className="block text-gray-700 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Primary Platform</label>
              <div className="grid grid-cols-2 gap-2">
                {platforms.map(platform => (
                  <button
                    key={platform}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, platform }))}
                    className={`p-2 border rounded ${formData.platform === platform ? 'bg-blue-100 border-blue-500' : ''}`}
                  >
                    {platform}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Audience Details</h2>
            <div>
              <label className="block text-gray-700 mb-1">Audience Size</label>
              <input
                type="text"
                name="audienceSize"
                value={formData.audienceSize}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="e.g., 50,000"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Engagement Rate</label>
              <div className="grid grid-cols-3 gap-2">
                {engagementRates.map(rate => (
                  <button
                    key={rate}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, engagementRate: rate }))}
                    className={`p-2 border rounded ${formData.engagementRate === rate ? 'bg-blue-100 border-blue-500' : ''}`}
                  >
                    {rate}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Content Preferences</h2>
            <div>
              <label className="block text-gray-700 mb-1">Categories</label>
              <div className="grid grid-cols-2 gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => handleCategorySelect(category)}
                    className={`p-2 border rounded ${formData.categories.includes(category) ? 'bg-blue-100 border-blue-500' : ''}`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Preferred Brands (comma separated)</label>
              <input
                type="text"
                name="preferredBrands"
                value={formData.preferredBrands.join(', ')}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  preferredBrands: e.target.value.split(',').map(b => b.trim())
                }))}
                className="w-full p-2 border rounded"
                placeholder="e.g., Nike, Adidas, Apple"
              />
            </div>
          </div>
        )}

        <div className="flex justify-between mt-8">
          {step > 1 && (
            <button
              type="button"
              onClick={handleBack}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            >
              Back
            </button>
          )}
          <button
            type="button"
            onClick={handleNext}
            className="ml-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {step === 3 ? 'Submit' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfluencerForm;