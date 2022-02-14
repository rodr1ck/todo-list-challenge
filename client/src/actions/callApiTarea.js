const callApiTarea = async () => {
  try {
    var requestOptions = {
      method: "GET",
    };
    const res = await fetch("/tarea", requestOptions);
    if (!res.ok) throw new Error(res.text);
    const json = await res.json();
    return { success: true, data: json };
  } catch (e) {
    console.error(e);
    return { success: false, data: [] };
  }
};

export default callApiTarea;
