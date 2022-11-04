import { utils } from "near-api-js";

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
        qr: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1920px-QR_code_for_mobile_English_Wikipedia.svg.png",
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

  async donateToBusker(accountId, amount) {
    const amountInYocto = utils.format.parseNearAmount(amount);
    return await this.wallet.callMethod({
      contractId: this.contractId,
      method: "donate_to_busker",
      args: { beneficiary: accountId },
      deposit: amountInYocto,
    });
  }
}
