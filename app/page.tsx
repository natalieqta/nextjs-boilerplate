'use client';

import { useState } from 'react';

interface FormData {
  coachName: string;
  evaluateeName: string;
  buildTrust: {
    rating: string;
    comments: string;
  };
  resilientUnderStress: {
    rating: string;
    comments: string;
  };
  movesFast: {
    rating: string;
    comments: string;
  };
  techMastery: {
    rating: string;
    comments: string;
  };
  teamPlayer: {
    rating: string;
    comments: string;
  };
  overallComments: string;
}

const ratingLabels = {
  '1': 'Getting Started',
  '2': 'On the Way',
  '3': 'Doing Great',
  '4': 'Really Strong',
  '5': 'Absolutely Amazing'
};

const ratingColors = {
  '1': 'bg-rose-50 border-rose-200 text-rose-700',
  '2': 'bg-amber-50 border-amber-200 text-amber-700',
  '3': 'bg-blue-50 border-blue-200 text-blue-700',
  '4': 'bg-indigo-50 border-indigo-200 text-indigo-700',
  '5': 'bg-emerald-50 border-emerald-200 text-emerald-700'
};

const selectedRatingColors = {
  '1': 'bg-rose-100 border-rose-400 shadow-md',
  '2': 'bg-amber-100 border-amber-400 shadow-md',
  '3': 'bg-blue-100 border-blue-400 shadow-md',
  '4': 'bg-indigo-100 border-indigo-400 shadow-md',
  '5': 'bg-emerald-100 border-emerald-400 shadow-md'
};

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    coachName: '',
    evaluateeName: '',
    buildTrust: { rating: '', comments: '' },
    resilientUnderStress: { rating: '', comments: '' },
    movesFast: { rating: '', comments: '' },
    techMastery: { rating: '', comments: '' },
    teamPlayer: { rating: '', comments: '' },
    overallComments: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    if (field.includes('.')) {
      const [section, subField] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section as keyof FormData] as { rating: string; comments: string },
          [subField]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to an API
    console.log('Form submitted:', formData);
    setSubmitted(true);
  };

  const ValueSection = ({ 
    title, 
    description, 
    questions, 
    fieldName 
  }: { 
    title: string; 
    description: string; 
    questions: string[];
    fieldName: keyof Pick<FormData, 'buildTrust' | 'resilientUnderStress' | 'movesFast' | 'techMastery' | 'teamPlayer'>;
  }) => {
    const value = formData[fieldName];
    
    return (
      <div className="border-b border-blue-100 pb-8 mb-8 last:border-b-0 last:pb-0 last:mb-0">
        <div className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-100">
          <h2 className="text-2xl font-semibold text-indigo-900 mb-2">{title}</h2>
          <p className="text-indigo-700 text-sm leading-relaxed">{description}</p>
        </div>
        
        <div className="mb-6 bg-amber-50 rounded-xl p-5 border border-amber-100">
          <h3 className="text-sm font-semibold text-amber-900 mb-3 flex items-center gap-2">
            <span>💭</span>
            Things to consider:
          </h3>
          <ul className="space-y-2.5">
            {questions.map((question, idx) => (
              <li key={idx} className="text-sm text-amber-800 flex items-start">
                <span className="text-amber-400 mr-2.5 mt-1">✨</span>
                <span>{question}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-indigo-900 mb-4">
            How would you rate this? <span className="text-rose-500">*</span>
          </label>
          <div className="flex gap-3 flex-wrap">
            {[1, 2, 3, 4, 5].map((num) => {
              const isSelected = value.rating === String(num);
              const baseColors = ratingColors[num as keyof typeof ratingColors];
              const selectedColors = selectedRatingColors[num as keyof typeof selectedRatingColors];
              
              return (
                <label
                  key={num}
                  className={`flex flex-col items-center justify-center w-24 h-24 border-2 rounded-2xl cursor-pointer transition-all transform hover:scale-105 ${
                    isSelected ? selectedColors : `${baseColors} hover:shadow-md`
                  }`}
                >
                  <input
                    type="radio"
                    name={fieldName}
                    value={num}
                    checked={isSelected}
                    onChange={(e) => handleInputChange(`${fieldName}.rating`, e.target.value)}
                    className="sr-only"
                    required
                  />
                  <span className="text-3xl font-bold mb-1">{num}</span>
                  <span className="text-xs font-medium mt-1 text-center px-2 leading-tight">
                    {ratingLabels[num as keyof typeof ratingLabels]}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-indigo-900 mb-2 flex items-center gap-2">
            <span>💬</span>
            Share your thoughts
          </label>
          <textarea
            value={value.comments}
            onChange={(e) => handleInputChange(`${fieldName}.comments`, e.target.value)}
            rows={4}
            className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 resize-none text-sm bg-white shadow-sm"
            placeholder="Share specific examples, celebrate wins, or offer gentle guidance..."
          />
        </div>
      </div>
    );
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center px-4">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-lg border-2 border-indigo-100 p-12 text-center">
          <div className="mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-indigo-900 mb-3">🎉 All Done!</h2>
            <p className="text-indigo-700 text-lg">Thank you so much for taking the time to share your thoughtful feedback!</p>
            <p className="text-indigo-600 text-sm mt-2">Your evaluation has been submitted successfully.</p>
          </div>
          <button
            onClick={() => {
              setSubmitted(false);
              setFormData({
                coachName: '',
                evaluateeName: '',
                buildTrust: { rating: '', comments: '' },
                resilientUnderStress: { rating: '', comments: '' },
                movesFast: { rating: '', comments: '' },
                techMastery: { rating: '', comments: '' },
                teamPlayer: { rating: '', comments: '' },
                overallComments: ''
              });
            }}
            className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Submit Another Evaluation
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl border-2 border-indigo-100 overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-8 py-8">
            <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
              <span>🌟</span>
              Performance Evaluation
            </h1>
            <p className="text-indigo-100 text-base">A supportive way to share feedback and celebrate growth</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8">
            <div className="mb-8 pb-8 border-b-2 border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-indigo-900 mb-2 flex items-center gap-2">
                    <span>👋</span>
                    Your Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.coachName}
                    onChange={(e) => handleInputChange('coachName', e.target.value)}
                    required
                    className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 bg-white shadow-sm"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-indigo-900 mb-2 flex items-center gap-2">
                    <span>👤</span>
                    Who are you evaluating? <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.evaluateeName}
                    onChange={(e) => handleInputChange('evaluateeName', e.target.value)}
                    required
                    className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 bg-white shadow-sm"
                    placeholder="Enter their name"
                  />
                </div>
              </div>
            </div>

            <ValueSection
              title="Build Trust"
              description="Demonstrates reliability, honesty, and integrity. Builds confidence through consistent actions and transparent communication."
              questions={[
                "Does the individual follow through on commitments and promises?",
                "Are they transparent and honest in their communication?",
                "Do they maintain confidentiality when appropriate?",
                "Do others feel comfortable sharing concerns or feedback with them?"
              ]}
              fieldName="buildTrust"
            />

            <ValueSection
              title="Resilient Under Stress"
              description="Maintains composure and effectiveness during challenging situations. Adapts quickly to changing circumstances and recovers from setbacks."
              questions={[
                "How does the individual handle pressure and tight deadlines?",
                "Do they remain calm and solution-focused during crises?",
                "How quickly do they recover from setbacks or failures?",
                "Can they maintain quality standards under stress?"
              ]}
              fieldName="resilientUnderStress"
            />

            <ValueSection
              title="Moves Fast"
              description="Executes with speed and efficiency. Balances urgency with quality, making timely decisions and delivering results quickly."
              questions={[
                "Does the individual deliver work in a timely manner?",
                "Are they able to make quick, informed decisions?",
                "Do they prioritize effectively to maximize impact?",
                "How well do they balance speed with quality?"
              ]}
              fieldName="movesFast"
            />

            <ValueSection
              title="Tech Mastery"
              description="Demonstrates deep technical expertise and continuous learning. Solves complex problems and contributes to technical excellence."
              questions={[
                "What is the depth of their technical knowledge in relevant areas?",
                "Do they stay current with industry best practices and technologies?",
                "Can they solve complex technical problems independently?",
                "How do they contribute to technical discussions and decisions?"
              ]}
              fieldName="techMastery"
            />

            <ValueSection
              title="Team Player"
              description="Collaborates effectively, supports teammates, and contributes to team success. Puts team goals ahead of individual interests."
              questions={[
                "How well do they collaborate with others?",
                "Do they actively support and help teammates?",
                "Are they receptive to feedback and different perspectives?",
                "Do they contribute to a positive team culture?"
              ]}
              fieldName="teamPlayer"
            />

            <div className="mt-8 pt-8 border-t-2 border-blue-100 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
              <label className="block text-sm font-semibold text-indigo-900 mb-3 flex items-center gap-2">
                <span>💝</span>
                Overall Thoughts & Encouragement
              </label>
              <textarea
                value={formData.overallComments}
                onChange={(e) => handleInputChange('overallComments', e.target.value)}
                rows={5}
                className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 resize-none text-sm bg-white shadow-sm"
                placeholder="Share your overall impressions, celebrate their strengths, offer encouragement, and provide any final thoughts..."
              />
            </div>

            <div className="mt-8 flex justify-end gap-4">
              <button
                type="button"
                onClick={() => {
                  if (confirm('Are you sure you want to start over? All your progress will be lost.')) {
                    setFormData({
                      coachName: '',
                      evaluateeName: '',
                      buildTrust: { rating: '', comments: '' },
                      resilientUnderStress: { rating: '', comments: '' },
                      movesFast: { rating: '', comments: '' },
                      techMastery: { rating: '', comments: '' },
                      teamPlayer: { rating: '', comments: '' },
                      overallComments: ''
                    });
                  }
                }}
                className="px-6 py-3 border-2 border-indigo-200 rounded-xl hover:bg-indigo-50 transition-all font-semibold text-indigo-700 hover:border-indigo-300"
              >
                Start Over
              </button>
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                ✨ Submit Evaluation
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
