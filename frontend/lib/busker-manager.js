export class BuskerManager {
  constructor({ contractId, userWallet }) {
    this.contractId = contractId;
    this.wallet = userWallet;
  }

  async setBusker(name, cat, loc, img, qr) {
    return await this.wallet.callMethod({
      contractId: this.contractId,
      method: "set_busker",
      args: {
        name: name,
        category: cat,
        location: loc,
        img: img,
        qr: qr,
      },
    });
  }

  async getBusker(accountId) {
    return await this.wallet.viewMethod({
      contractId: this.contractId,
      method: "get_busker",
      args: {
        account_id: accountId,
      },
    });
  }

  async deleteBusker(accountId) {
    return await this.wallet.callMethod({
      contractId: this.contractId,
      method: "delete_busker",
      args: {
        account_id: accountId,
      },
    });
  }

  async getBuskers() {
    return await this.wallet.viewMethod({
      contractId: this.contractId,
      method: "get_buskers",
    });
  }
}
