import { FormRow, FormRowSelect, SubmitBtn } from ".";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { Form, useSubmit, Link } from "react-router-dom";
import { JOB_TYPE, JOB_STATUS, JOB_SORT_BY } from "../../../utils/constants";
import { useAllJobsContext } from "../pages/AllJobs";

const SearchContainer = () => {
  const { searchValues } = useAllJobsContext();
  const { search, status, jobType, sort } = searchValues;
  const submit = useSubmit();

  const debounce = (onChange) => {
    let timeout;
    return (e) => {
      const form = e.currentTarget.form;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        onChange(form);
      }, 1500);
    };
  };

  return (
    <Wrapper>
      <Form className="form">
        <h5 className="form-title">Пошук та фільтрація</h5>
        <div className="form-center">
          <FormRow
            type="search"
            name="search"
            labelText="Пошук"
            defaultValue={search}
            onChange={debounce((form) => {
              submit(form);
            })}
          />

          <FormRowSelect
            labelText="Статус вакансії"
            name="status"
            list={["all", ...Object.values(JOB_STATUS)]}
            defaultValue={status}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />
          <FormRowSelect
            labelText="Тип вакансії"
            name="jobType"
            list={["all", ...Object.values(JOB_TYPE)]}
            defaultValue={jobType}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />
          <FormRowSelect
            labelText="Сортування"
            name="sort"
            defaultValue={sort}
            list={[...Object.values(JOB_SORT_BY)]}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />
          <Link to="/dashboard/all-jobs" className="btn form-btn delete-btn">
            Скинути параметри пошуку
          </Link>
        </div>
      </Form>
    </Wrapper>
  );
};
export default SearchContainer;
