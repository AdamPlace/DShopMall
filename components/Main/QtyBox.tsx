import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

export default function QtyBox({
  qty,
  name,
  onQtyChange,
  onMinusClick,
  onPlusClick,
}: QtyBoxProps) {
  return (
    <div className="flex">
      <button
        type="button"
        className="w-9 h-9 border border-[#ddd] flex justify-center items-center"
        onClick={onMinusClick}
      >
        <AiOutlineMinus />
      </button>
      <input
        type="number"
        value={qty}
        min="1"
        className="w-10 h-9 border-t border-b border-[#ddd] text-center"
        onChange={onQtyChange}
        name={name}
      />
      <button
        type="button"
        className="w-9 h-9 border border-[#ddd] flex justify-center items-center"
        onClick={onPlusClick}
      >
        <AiOutlinePlus />
      </button>
    </div>
  );
}
