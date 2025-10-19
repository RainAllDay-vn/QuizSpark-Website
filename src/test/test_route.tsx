// ./test/testRoutes.tsx
import { Route } from "react-router-dom";
import Test_quizz_page from "./test_pages/test_quizz_page";

export const testRoutes = [
  <Route key="test-quizz" path="/test/quizz" element={<Test_quizz_page/>} />,
];
