import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center; /* 부모 요소를 가운데 정렬 */
  margin-top: 10%; /* margin-top 제거 */
`;

export const ChildClass = styled.div.attrs({
  className: `max-w-sm mx-auto`,
})`
  text-align: left;
  width: 100%;
`;

export const FormStyle = styled.form.attrs({
  className: `max-w-sm mx-auto`,
})``;

export const InnerContainer = styled.div.attrs({
  className: `mt-5 mb-5`,
})``;

export const InnerChildDiv = styled.div.attrs({
  className: "mt-2 mb-2",
})``;

export const Btn = styled.button.attrs({
  className: `text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`,
})``;

export const ErrorTitle = styled.p.attrs({
  className: `mt-2 text-sm text-red-600 dark:text-red-500 mb-5`,
})``;

// style str
export const labelClass = `block mb-2 text-sm font-medium text-gray-900 dark:text-white`;
export const inputClass = `bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`;
export const ButtonClass = `text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500`;

export const GoContainer = styled.div`
  text-align: left;
`;
