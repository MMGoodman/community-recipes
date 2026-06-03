const userController = require('./user.controller');


async function addNewUser(data) {

    if (!data?.email) throw { code: 400, message: "email input error" }

    let user = await userController.readOne({ email: data.email });
    if (user) throw { code: user.isActive ? 400 : 450, message: "המשתמש כבר קיים במערכת" };

    let newUserMapped = await handelValidation(data);

    const adminCount = await userModel.countDocuments({ admin: true });
    if (adminCount === 0) {
        newUserMapped.admin = true;
    }

    console.log(newUserMapped, " from service");
    let result = await userController.create(newUserMapped)
    return result;
}

async function handelValidation(reqBody) {
    //validaiton
    // password > 6 digits / a-z + numbers
    return {
        lName: reqBody.lName,
        fName: reqBody.fName,
        email: reqBody.email,
        password: reqBody.password
    }
}


const userModel = require('./user.module');

async function readUser(filter = {}) {
  const cleanFilter = {
    fName: filter.fName?.trim(),
    lName: filter.lName?.trim(),
    password: filter.password?.trim(),
  };

  console.log("🔍 קריאת משתמש עם פילטר:", cleanFilter);

  const user = await userModel.findOne({
    fName: new RegExp(`^${cleanFilter.fName}$`, 'i'),
    lName: new RegExp(`^${cleanFilter.lName}$`, 'i'),
    password: cleanFilter.password,
  });

  return user;
}
async function getAllUsers() {
    return await userModel.find({}, { password: 0 });
}

async function setUserRole(userId, role) {
    const update = {
        admin: role === 'admin',
        editor: role === 'editor'
    };
    return await userModel.findByIdAndUpdate(userId, update, { new: true, select: '-password' });
}

module.exports = {
  addNewUser,
  handelValidation,
  readUser,
  getAllUsers,
  setUserRole
};
