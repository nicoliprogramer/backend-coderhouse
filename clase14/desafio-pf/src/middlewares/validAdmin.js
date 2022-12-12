const validateAdmin = (admin) => (request, response, next) => {

    const { method, originalUrl } = request;
  
    const authorized = admin ? true : false;
  
    if (authorized) {
  
      next();
  
    } else {
  
      response.status(401).json({
  
        error: -1,
        descripcion: `La ruta '${originalUrl}' no se encuentra disponible`,
        user: request.user
  
      });
  
    }
    
  };
  
  module.exports = validateAdmin;