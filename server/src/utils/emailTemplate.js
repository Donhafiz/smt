export const emailTemplate = ({
  title,
  message
}) => {

  return `
    <div
      style="
        background:#020617;
        padding:40px;
        color:white;
        font-family:Arial;
      "
    >

      <div
        style="
          max-width:600px;
          margin:auto;
          background:#0f172a;
          padding:30px;
          border-radius:12px;
        "
      >

        <h1 style="color:#3b82f6;">
          SMT ERP
        </h1>

        <h2>${title}</h2>

        <div style="color:#cbd5e1;">
          ${message}
        </div>

      </div>

    </div>
  `
}