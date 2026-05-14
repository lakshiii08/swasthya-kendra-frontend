type ButtonProps = {
  text: string;
};

export default function Button({ text }: ButtonProps) {
  return (
    <button className="px-6 py-3 bg-teal-600 text-white rounded-xl hover:scale-105 transition-all duration-300">
      {text}
    </button>
  );
}