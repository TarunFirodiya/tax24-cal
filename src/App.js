import React, { useState } from 'react';
import logo from './LOGO.png'; 

const indexData = {
  "2001-02": 100, "2002-03": 105, "2003-04": 109, "2004-05": 113, "2005-06": 117,
  "2006-07": 122, "2007-08": 129, "2008-09": 137, "2009-10": 148, "2010-11": 167,
  "2011-12": 184, "2012-13": 200, "2013-14": 220, "2014-15": 240, "2015-16": 254,
  "2016-17": 264, "2017-18": 272, "2018-19": 280, "2019-20": 289, "2020-21": 301,
  "2021-22": 317, "2022-23": 331, "2023-24": 348, "2024-25": 363
};

const CapitalGainTaxCalculator = () => {
  const [saleValue, setSaleValue] = useState('');
  const [costOfAcquisition, setCostOfAcquisition] = useState('');
  const [purchaseYear, setPurchaseYear] = useState('');
  const [results, setResults] = useState(null);

  const calculateTax = () => {
    const sale = parseFloat(saleValue) * 100;
    const cost = parseFloat(costOfAcquisition) * 100;
    const indexationFactor = indexData["2024-25"] / indexData[purchaseYear];

    if (isNaN(sale) || isNaN(cost) || !purchaseYear) {
      alert('Please enter valid numbers for all fields');
      return;
    }

    const indexedCost = cost * indexationFactor;
    const oldRegimeGain = Math.max(0, sale - indexedCost);
    const oldTax = oldRegimeGain * 0.20;

    const newRegimeGain = Math.max(0, sale - cost);
    const newTax = newRegimeGain * 0.125;

    const taxSavings = oldTax - newTax;

    setResults({
      oldTax: oldTax / 100,
      newTax: newTax / 100,
      taxSavings: taxSavings / 100,
      isBeneficial: newTax < oldTax
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Capital Gain Tax Calculator',
        text: 'Check out this Capital Gain Tax Calculator for India!',
        url: window.location.href
      }).then(() => {
        console.log('Thanks for sharing!');
      }).catch(console.error);
    } else {
      alert('Sharing is not supported on this browser. Please copy the URL manually.');
    }
  };

  return (
    <html lang="en">  
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 flex flex-col items-center p-4 space-y-6 md:space-y-8" style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '0.025em' }}>
      <div className="w-full max-w-4xl flex justify-between items-center">
      <a href="https://www.seraihomes.com"><img src={logo} alt="Serai Homes logo" className="h-8 md:h-12" /></a>
      </div>
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6 relative">
          <h1 className="text-xl md:text-2xl font-bold">Tax on sale of property</h1>
          <p className="text-sm mt-2">Calculate the impact of capital gain tax change as per 2024 budget</p>
          <button onClick={handleShare} className="absolute top-4 right-4 bg-white text-blue-500 hover:bg-blue-100 rounded-full p-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="18" cy="5" r="3"></circle>
              <circle cx="6" cy="12" r="3"></circle>
              <circle cx="18" cy="19" r="3"></circle>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
            </svg>
          </button>
        </div>
        <div className="mt-4 space-y-4 p-6">
          <div>
            <label htmlFor="saleValue" className="block text-sm font-medium text-gray-700">Sale Value (in Lacs)</label>
            <input
              id="saleValue"
              type="number"
              value={saleValue}
              onChange={(e) => setSaleValue(e.target.value)}
              placeholder="Enter sale value in Lacs"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="costOfAcquisition" className="block text-sm font-medium text-gray-700">Cost of Acquisition (in Lacs)</label>
            <input
              id="costOfAcquisition"
              type="number"
              value={costOfAcquisition}
              onChange={(e) => setCostOfAcquisition(e.target.value)}
              placeholder="Enter cost of acquisition in Lacs"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="purchaseYear" className="block text-sm font-medium text-gray-700">Year of Purchase</label>
            <select
              id="purchaseYear"
              value={purchaseYear}
              onChange={(e) => setPurchaseYear(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="">Select year of purchase</option>
              {Object.keys(indexData).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <button 
            onClick={calculateTax} 
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-2 px-4 rounded-lg"
          >
            Calculate Tax
          </button>
          {results && (
            <div className="mt-6 p-4 bg-gray-100 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-center">Results</h3>
              <div className="text-center mb-4">
                <p className={`text-2xl font-bold ${results.isBeneficial ? 'text-green-600' : 'text-red-600'}`}>
                  Tax Savings: ₹{results.taxSavings.toFixed(1)} Lacs
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  {results.isBeneficial ? "New regime is more beneficial" : "Old regime is more beneficial"}
                </p>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th className="text-left">Regime</th>
                    <th className="text-right">Tax Amount (in Lacs)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Old Regime Tax</td>
                    <td className="text-right">₹{results.oldTax.toFixed(1)}</td>
                  </tr>
                  <tr>
                    <td>New Regime Tax</td>
                    <td className="text-right">₹{results.newTax.toFixed(1)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl overflow-hidden">
        <div className="p-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <h3 className="text-xl font-semibold text-center md:text-left">Looking to buy or sell property in Bangalore?</h3>
          <button 
            onClick={() => window.open('https://wa.me/918904279890', '_blank')}
            className="bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full px-4 py-2 flex items-center space-x-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
            </svg>
            <span>WhatsApp Us</span>
          </button>
        </div>
      </div>
    </div>
    </html>
  );
};

export default CapitalGainTaxCalculator;