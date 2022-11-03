export class BuskerManager {
  constructor({ contractId, userWallet }) {
    this.contractId = contractId;
    this.wallet = userWallet;
  }

  async setBusker(name) {
    return await this.wallet.callMethod({
      method: "set_busker",
      args: { name: name },
      contractId: this.contractId,
    });
  }

  async getBuskers() {
    return await this.wallet.viewMethod({
      contractId: this.contractId,
      method: "get_buskers",
    });
  }
}
