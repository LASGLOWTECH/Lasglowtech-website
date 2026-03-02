import { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import faqs from '../assets/data/faq';

const FaqSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <section className="py-12 px-4 md:px-12 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-4">Frequently Asked Questions</h2>
      <p className="text-center text-gray-500 mb-8 max-w-xl mx-auto">
        Find quick solutions to common queries. If you need more information, feel free to reach out to us directly!
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {[0, 1].map((colOffset) => (
          <div key={colOffset}>
            {faqs
              .filter((_, i) => i % 2 === colOffset)
              .map((faq, index) => {
                const globalIndex = index * 2 + colOffset;
                const isActive = activeIndex === globalIndex;

                return (
                  <div key={globalIndex} className="border-b border-gray-300 py-3">
                    <button
  onClick={() => toggleFAQ(globalIndex)}
  className="w-full flex justify-between items-center text-left font-medium text-base text-gray-700 hover:bg-Primarycolor hover:text-textcolor2 transition-colors duration-200 p-2 rounded-md"
>
  {faq.question}
  {isActive ? <FaMinus className="text-purple-600" /> : <FaPlus className="text-Primarycolor hover:text-textcolor2 " />}
</button>
                    {isActive && (
                      <p className="mt-2 text-sm text-gray-600">
                        {faq.answer}
                      </p>
                    )}
                  </div>
                );
              })}
          </div>
        ))}
      </div>

    
    </section>
  );
};

export default FaqSection;
