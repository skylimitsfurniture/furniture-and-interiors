import { POST as createOrderHandler } from "../create-order/route";

export async function POST(req) {
  return createOrderHandler(req);
}
