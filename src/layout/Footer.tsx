const Footer = () => {
  return (
    <footer className="mt-24 border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-14">
        {/* Top Section */}
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-violet-700">Darul Huda</h2>

            <p className="mt-2 text-sm font-medium text-gray-600">
              Islamic Guidance Platform
            </p>

            <p className="mt-4 text-sm leading-7 text-gray-500">
              Helping Muslims find authentic Islamic knowledge based on the
              Quran, Sunnah, and Hanafi Fiqh.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-gray-900">
              Quick Links
            </h3>

            <ul className="space-y-3 text-sm text-gray-600">
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">Q&A</a>
              </li>
              <li>
                <a href="#">Scholar Directory</a>
              </li>
              <li>
                <a href="#">Knowledge</a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-gray-900">
              Resources
            </h3>

            <ul className="space-y-3 text-sm text-gray-600">
              <li>
                <a href="#">Quran</a>
              </li>
              <li>
                <a href="#">Hadith</a>
              </li>
              <li>
                <a href="#">Prayer Times</a>
              </li>
              <li>
                <a href="#">Ask a Scholar</a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-gray-900">
              Contact
            </h3>

            <ul className="space-y-3 text-sm text-gray-600">
              <li>contact@darulhuda.pk</li>
              <li>Pakistan</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-6 text-sm text-gray-500 md:flex-row">
          <p>© 2026 Darul Huda. All Rights Reserved.</p>

          <div className="flex gap-6">
            <a href="#" className="hover:text-violet-700">
              Privacy Policy
            </a>

            <a href="#" className="hover:text-violet-700">
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

// const Footer = () => {
//   return (
//     <footer className="mt-20 border-t bg-gray-50">
//       <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
//         <div>
//           <h2 className="text-xl font-bold text-violet-700">Darul Huda</h2>
//           <p className="text-sm text-gray-500">
//             Authentic Hanafi Knowledge Platform
//           </p>
//         </div>

//         <div className="flex gap-6 text-sm">
//           <a href="#">Privacy</a>
//           <a href="#">Terms</a>
//           <a href="#">Contact</a>
//         </div>

//         <p className="text-sm text-gray-500">© 2026 Darul Huda</p>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
