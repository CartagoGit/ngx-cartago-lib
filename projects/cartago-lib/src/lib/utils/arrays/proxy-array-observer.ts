/**
 * ? Proxy para observar los cambios que puedan ocurrir en un array y realizar una funcion cuando esto ocurra
 * @param {any[]} array - El array al que añadir el proxy
 * @param {(value: any) => void} [changeValueCallback=() => {}] - Callback para cambiar el valor antes de realizar el cambio en el array
 * @param {(...args: any) => void} [finalCallback=() => {}] - Callback llamado al terminar el cambio en el array
 * @param {boolean} [showLogs=false] - Mostrar Logs
 * @returns {void, finalCallback?: (...args: any) => void, showLogs?: boolean) => any} - Retorna el Array con el proxy implementado
 */
export const proxyArrayObserver = (
	array: any[],
	changeValueCallback: (value: any) => void = () => {},
	finalCallback: (...args: any) => void = () => {},
	showLogs: boolean = false
) => {
	!!showLogs && console.log(array);
	//* Si el navegador no acepta Proxys
	if (typeof window !== "undefined" && !("Proxy" in window)) {
		console.warn("Your browser doesn't support Proxies.");
		return array;
	}
	//* Devuelve el proxy
	return new Proxy(array, {
		deleteProperty: function (target, property) {
			const properties = { target, property };
			//* Logs
			!!showLogs && console.log("PROPERTIES:", properties);
			!!showLogs && console.log("Deleted %s", property);

			//* Elimina el elemento en la posicion
			delete target[Number(property)];

			//* Llama al callback final
			finalCallback(properties, "delete");
			return true;
		},
		set: function (target, property, value, receiver) {
			const properties = { target, property, value, receiver };
			//* Logs
			!!showLogs && console.log("PROPERTIES:", properties);
			!!showLogs && console.log("Set %s to %o", property, value);

			//* Si cambia el valor
			property !== "length" && (value = changeValueCallback(value));

			//* Setea el cambio
			target[Number(property)] = value;

			//*Llama al callback final
			finalCallback(properties, "set");
			return true;
		},
	});
};
