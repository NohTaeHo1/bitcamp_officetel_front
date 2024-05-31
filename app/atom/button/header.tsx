export default function CommonHeader() {
  return (
    <>
      <table
        className="table-auto w-11/12 border-x-black"
        style={{ margin: "15px auto" }}
      >
        <tbody>
          <tr className="w-full bg-white border-b-2 border-gray-200 p-0 h-20 text-[20px] inline-block">
            <td
              align="left"
              className="w-10/12 p-1 h-full text-[20px] inline-block"
              style={{
                backgroundImage: "url('/user/img/Logo.png')",
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
              }}
            ></td>

            <td
              className="w-1/12 bg-white  p-1 h-full text-[15px] inline-block"
              style={{
                backgroundImage: "url('/user/img/logout.png')",
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
                backgroundPosition: "top right",
              }}
            ></td>            
            <td
              align="center"
              className="w-1/12 p-1 h-20 text-[2px] inline-block"
              style={{
                backgroundImage: "url('/user/img/profile2.png')",
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
                backgroundPosition: "top right",
              }}
            ></td>
          </tr>
          <tr>
            <td
              className="w-full bg-white  p-1 h-2 "
            ></td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
