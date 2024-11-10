import { createElysia } from "@libs/elysia";

const HiController = createElysia().get("/", () => {
  return {
    status: 200,
    msg: "Elysia Boilerplate by xyzuan",
  };
});

export default HiController;
