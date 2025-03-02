// import React from 'react';
// import { TrendingUp } from 'lucide-react';

// const Header: React.FC = () => {
//   return (
//     <header className="bg-white shadow">
//       <div className="container mx-auto px-4 py-6">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center">
//             <TrendingUp className="h-8 w-8 text-blue-600 mr-3" />
//             <div>
//               <h1 className="text-2xl font-bold text-gray-900">Crypto Price Tracker</h1>
//               <p className="text-gray-600">Track cryptocurrency prices in real-time</p>
//             </div>
//           </div>
//           <div>
//             <a 
//               href="/docs" 
//               target="_blank" 
//               rel="noopener noreferrer"
//               className="text-blue-600 hover:text-blue-800 font-medium"
//             >
//               Documentation
//             </a>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;

import React from 'react';
import { TrendingUp } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-blue-600 mr-3" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Crypto Price Tracker</h1>
              <p className="text-gray-600">Track cryptocurrency prices in real-time</p>
            </div>
          </div>
          <div>
            <a 
              href="/docs/api-integration" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Documentation
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
