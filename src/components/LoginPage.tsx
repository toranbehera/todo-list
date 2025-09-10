import { useFormik } from "formik";

export default function SignupForm() {
  const formik = useFormik({
    initialValues: { email: "" },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    }
  });
  return (
    <div className="flex justify-center">
      
      <form 
      onSubmit={formik.handleSubmit}
      className="flex flex-col border-1 border-gray-100 m-10 gap-5 rounded-lg shadow-xl p-5"
      >
        <h1 className="text-center font-bold text-xl">Log in</h1>
        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          className="border-1"
        />
        <button 
          type="submit"
          className="
            bg-blue-400 
            text-white 
            p-2 
            rounded-sm 
            shadow-lg 
            active:opacity-75
            hover:bg-blue-500
          "
        >
          Submit
        </button>
      </form>
    </div>
    
  );
};
