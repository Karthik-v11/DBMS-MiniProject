App = {
  loading: false,
  contracts: {},

  load: async () => {
    await App.loadWeb3();
    await App.loadAccount();
    await App.loadContract();
    await App.render();
  },

  // https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
  loadWeb3: async () => {
    if (typeof web3 !== "undefined") {
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      window.alert("Please connect to Metamask.");
    }
    // Modern dapp browsers...
    if (window.ethereum) {
      window.web3 = new Web3(ethereum);
      try {
        // Request account access if needed
        await ethereum.enable();
        // Acccounts now exposed
        web3.eth.sendTransaction({
          /* ... */
        });
      } catch (error) {
        // User denied account access...
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = web3.currentProvider;
      window.web3 = new Web3(web3.currentProvider);
      // Acccounts always exposed
      web3.eth.sendTransaction({
        /* ... */
      });
    }
    // Non-dapp browsers...
    else {
      console.log(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  },

  loadAccount: async () => {
    App.account = web3.eth.accounts[0];
  },

  loadContract: async () => {
    const BankMgm = await $.getJSON("BankManagement.json");
    App.contracts.BankManagement = TruffleContract(BankMgm);
    App.contracts.BankManagement.setProvider(App.web3Provider);

    App.BankMgm = await App.contracts.BankManagement.deployed();
  },

  render: async () => {
    if (App.loading) {
      return;
    }

    App.setLoading(true);

    $("#account").html(App.account);

    await App.renderTasks();

    App.setLoading(false);
  },

  renderTasks: async () => {
    const userCount = await App.BankMgm.userCount();
    const $userTemplate = $(".userTemplate");

    for (var i = 1; i <= userCount; i++) {
      const user = await App.BankMgm.users(i);
      const userAccNo = user[1].toNumber();
      const userIFSC = user[2];
      const userBranch = user[3];
      const userName = user[4];
      const userAddress = user[5];
      const userDob = user[6];
      const userBalance = user[7].toNumber();
      const userMobileNumber = user[8].toNumber();

      // Create the html for the details
      const $newUserTemplate = $userTemplate.clone();
      $newUserTemplate.find(".accNo").html(userAccNo);
      $newUserTemplate.find(".ifsc").html(userIFSC);
      $newUserTemplate.find(".branchName").html(userBranch);
      $newUserTemplate.find(".userName").html(userName);
      $newUserTemplate.find(".address").html(userAddress);
      $newUserTemplate.find(".dob").html(userDob);
      $newUserTemplate.find(".balance").html(userBalance);
      $newUserTemplate.find(".mobileNo").html(userMobileNumber);

      $("#usersList").append($newUserTemplate);
      $newUserTemplate.show();
    }
  },

  createUser: async () => {
    App.setLoading(true);
    const accNo = $("#accountNo").val();
    const ifsc = $("#ifsc").val();
    const branchName = $("#branchName").val();
    const userName = $("#Name").val();
    const address = $("#address").val();
    const dob = $("#birthDate").val();
    const balance = $("#balance").val();
    const userNumber = $("#mobileNo").val();

    console.log(
      accNo,
      ifsc,
      branchName,
      userName,
      address,
      dob,
      balance,
      userNumber
    );

    await App.BankMgm.createUser(
      accNo,
      ifsc,
      branchName,
      userName,
      address,
      dob,
      balance,
      userNumber
    );
    window.location.reload();
  },

  setLoading: (boolean) => {
    App.loading = boolean;
    const loader = $("#loader");
    const content = $("#content");
    if (boolean) {
      loader.show();
      content.hide();
    } else {
      loader.hide();
      content.show();
    }
  },
};

$(() => {
  $(window).load(() => {
    App.load();
  });
});
