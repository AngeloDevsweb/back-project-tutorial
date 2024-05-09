import Client from '../models/client.model.js'

//traer la lista de clientes
export const getClient = async (req, res) => {
    const clients = await Client.find({
      user: req.user.id,
    }).populate('user');
    res.json(clients);
  };
//para solo ver un solo cliente
export const getClientOne = async (req, res) =>{
    const client = await Client.findById(req.params.id);
    if(!client) return res.status(404).json({message:"cliente no encontrado"})

    res.json(client)
}
//crear para el cliente
export const createClient = async (req, res) => {
    const { nombre, descripcion, direccion, web, industria, estado, telefono } =
      req.body;
  
    const newClient = new Client({
      nombre,
      descripcion,
      direccion,
      web,
      industria,
      estado,
      telefono,
      user: req.user.id,
    });
    const savedClient = await newClient.save()
    res.json(savedClient)
  };
//poder eliminar el cliente
export const deleteClient = async(req, res) =>{
    const client = await Client.findByIdAndDelete(req.params.id)
    if(!client) return res.status(404).json({message: "cliente no encontrado"})

    return res.sendStatus(204);
}
//poder actualizar el cliente
export const updteClient = async(req, res)=>{
    const client = await Client.findByIdAndUpdate(req.params.id, req.body, {new:true})
    if(!client) return res.status(404).json({message:"cliente no encontrado"})

    res.json(client)
}