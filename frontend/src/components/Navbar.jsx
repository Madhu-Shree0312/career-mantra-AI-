function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-transparent text-white">
      <h1 className="text-2xl font-bold">Career Mantra AI 🌟</h1>
      <ul className="flex gap-6 text-lg">
        <li className="hover:text-yellow-300 cursor-pointer">Home</li>
        <li className="hover:text-yellow-300 cursor-pointer">About</li>
        <li className="hover:text-yellow-300 cursor-pointer">Services</li>
        <li className="hover:text-yellow-300 cursor-pointer">Contact</li>
      </ul>
    </nav>
  );
}

export default Navbar;
