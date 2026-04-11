import { FormRow, FormRowSelect, SubmitBtn } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useOutletContext } from "react-router-dom";
import { JOB_STATUS, JOB_TYPE } from "../../../utils/constants";
import { Form, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

export const action =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      await customFetch.post(`/jobs`, data);
      queryClient.invalidateQueries(["jobs"]);
      toast.success(`Вакансію успішно додано!`);
      return redirect(`all-jobs`);
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };

const AddJob = () => {
  const { user } = useOutletContext();

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">Додати вакансію</h4>
        <div className="form-center">
          <FormRow type="text" name="position" labelText="Посада" />
          <FormRow type="text" name="company" labelText="Компанія" />
          <FormRow
            type="text"
            labelText="Місце роботи"
            name="jobLocation"
            defaultValue={user.location}
          />
          <FormRowSelect
            labelText="Статус вакансії"
            name="status"
            defaultValue={JOB_STATUS.PENDING}
            list={Object.values(JOB_STATUS)}
          />
          <FormRowSelect
            labelText="Тип вакансії"
            name="jobType"
            defaultValue={JOB_TYPE.FULL_TIME}
            list={Object.values(JOB_TYPE)}
          />
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};
export default AddJob;
