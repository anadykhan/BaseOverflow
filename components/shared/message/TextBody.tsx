import TextBox from "./TextBox"

const TextBody = () => {
  return (
    <div className="flex flex-col gap-4 h-full justify-end">
      <div className="flex justify-end">
        <TextBox user={true} />
      </div>
      <div className="flex justify-start">
        <TextBox user={false} />
      </div>
    </div>
  );
}
export default TextBody