export class BuskerManager {
  constructor({ contractId, userWallet }) {
    this.contractId = contractId;
    this.wallet = userWallet;
  }

  async getBuskers() {
    return await this.wallet.viewMethod({
      contractId: this.contractId,
      method: "get_buskers",
    });
  }
}
