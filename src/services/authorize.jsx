//เก็บข้อมูลการเข้าสู่ระบบ
export const authenicate = (response, next) => {
  if (window !== "undefined") {
    //set ข้อมูลลง cookie
    document.cookie = `tokenAdmin=${response.data.token}; max-age=86400; path=/;`;
    document.cookie = `userAdmin=${response.data.user.name}; max-age=86400; path=/;`;

    next();
  }
};

export const onRemembered = (response, next) => {
  if (window !== "undefined") {
    //set ข้อมูลลง cookie

    var date = new Date();
    var expiresDate = new Date(date.setMonth(date.getMonth() + 1));
    var expires = "expires=" + expiresDate.toUTCString();
    document.cookie = `tokenAdmin=${response.data.token}; ${expires}; path=/;`;
    document.cookie = `userAdmin=${response.data.user.name}; ${expires}; path=/;`;

    next();
  }
};

//ดึง token จาก sessionStorage
export const getToken = () => {
  if (window !== "undefined") {
    if (document.cookie.includes("tokenAdmin=")) {
      return document.cookie
        .split(";")
        .find((c) => c.includes("tokenAdmin"))
        .split("=")[1];
    } else {
      return false;
    }
  }
};

//ดึงข้อมูลผู้ใช้จาก sessionStorage
export const getUser = () => {
  if (window !== "undefined") {
    if (document.cookie.includes("userAdmin=")) {
      return document.cookie
        .split(";")
        .find((c) => c.includes("userAdmin"))
        .split("=")[1];
    } else {
      return false;
    }
  }
};

//ลบข้อมูลการเข้าสู่ระบบ
export const logout = (next) => {
  if (window !== "undefined") {
    //ลบ cookie userAdmin
    document.cookie =
      "tokenAdmin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "userAdmin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }

  next();
};
