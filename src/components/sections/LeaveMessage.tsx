import LeaveMessageForm from "../forms/LeaveMessageForm";

const LeaveMessage = () => {
  return (
    <section className="p-[20px] py-[50px] max-w-6xl mx-auto">
      <p className="text-lg md:text-2xl font-semibold mb-2 lg:text-3xl">
        Leave A Message For Us
      </p>
      <div className="grid md:grid-cols-2 gap-[20px]">
        {/* ✅ Make sure this file exists: public/images/we-build.png */}
        <img
          src="/images/we-build.png"
          alt="We Build"
          className="w-full hidden md:flex"
        />
        <LeaveMessageForm />
      </div>
    </section>
  );
};

export default LeaveMessage;
