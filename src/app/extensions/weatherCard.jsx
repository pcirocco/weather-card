// import React, { useEffect, useState } from "react";
// import {
//   Divider,
//   Link,
//   Button,
//   Text,
//   Input,
//   Flex,
//   hubspot,
// } from "@hubspot/ui-extensions";

// // Define the extension to be run within the Hubspot CRM
// hubspot.extend(({ context, runServerlessFunction, actions }) => (
//   <WeatherCard
//     context={context}
//     runServerless={runServerlessFunction}
//     fetchProperties={actions.fetchCrmObjectProperties}
//     //sendAlert={actions.addAlert}
//   />
// ));

// // Define the Extension component, taking in runServerless, context, & sendAlert as props
// const WeatherCard = ({ fetchProperties, runServerless }) => {
//   const [city, setCity] = useState("")
//   const [res, setRes] = useState({})
//   const [isDataFetched, setIsDataFetched] = useState(false);

//   useEffect(() => {
//     fetchProperties(["city"])
//     .then(properties => {
//       setCity(properties.city)
//       console.log(city)
//       //setIsDataFetched(true)
//     })
//   }, [])

//   useEffect(() => {
//     const executeServerlessFunction = async () => {
//       try {
//         const serverlessResult = await runServerless({
//           name: "myFunc",
//           parameters: { city }
//         });
//         if (serverlessResult.status === "SUCCESS" && Object.values(serverlessResult.response).length !== 0) {
//           setRes(serverlessResult);
//           console.log(serverlessResult)
//           setIsDataFetched(true)
//         } else {
//           console.error("Error executing serverless function: ", serverlessResult);
//         }
//       } catch (error) {
//         console.log(error)
//       }
//     }
//     executeServerlessFunction();
//   }, [res])
  

//   // Call serverless function to execute with parameters.
//   // The `myFunc` function name is configured inside `serverless.json`
//   // const handleClick = async () => {
//   //   const { response } = await runServerless({ name: "myFunc", parameters: { text: text } });
//   //   sendAlert({ message: response });
//   // };

//   return (
//     <>
//       {isDataFetched ? (
//         <Text>{res}</Text>
//           ) : (
//             <Flex>
//               <Text>Loading...</Text>
//             </Flex>
//           )}
//     </>
//   );
// };


import React, { useEffect, useState } from "react";
import {
  Divider,
  Link,
  Button,
  Text,
  Input,
  Flex,
  hubspot,
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
} from "@hubspot/ui-extensions";
//require('dotenv').config();


// Define the extension to be run within the Hubspot CRM
hubspot.extend(({ context, runServerlessFunction, actions }) => (
  <WeatherCard
    context={context}
    runServerless={runServerlessFunction}
    fetchProperties={actions.fetchCrmObjectProperties}
    //sendAlert={actions.addAlert}
  />
));

// Define the Extension component, taking in runServerless, context, & sendAlert as props
const WeatherCard = ({ fetchProperties, runServerless }) => {
  const [city, setCity] = useState("");
  const [res, setRes] = useState({});
  const [isDataFetched, setIsDataFetched] = useState(false);

  useEffect(() => {
    fetchProperties(["city"]).then((properties) => {
      setCity(properties.city);
      console.log(properties.city);  // Corrected to log `properties.city`
    });
  }, []);

  useEffect(() => {
    const executeServerlessFunction = async () => {
      try {
        const serverlessResult = await runServerless({
          name: "myFunc",
          parameters: { city },
        });
        if (
          serverlessResult.status === "SUCCESS" &&
          Object.values(serverlessResult.response).length !== 0
        ) {
          setRes(serverlessResult);
          console.log(serverlessResult);
          setIsDataFetched(true);
        } else {
          console.error("Error executing serverless function: ", serverlessResult);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (city) {
      // Only execute the serverless function if `city` is available
      executeServerlessFunction();
    }
  }, [city]); // Trigger effect when `city` changes

  return (
    <>
      {isDataFetched ? (
        <Flex>
          <Table bordered={true} paginated={false}>
            <TableHead>
              <TableRow>
                <TableHeader>Current Weather Conditions</TableHeader>
                <TableHeader>Current Temperature</TableHeader>
                <TableHeader>Today's High</TableHeader>
                <TableHeader>Today's Low</TableHeader>
              </TableRow>
            </TableHead>

            <TableBody>
              <TableRow>
                <TableCell>{res.response.weather[0].main}</TableCell>
                <TableCell>{res.response.main.temp}</TableCell>
                <TableCell>{res.response.main.temp_max}</TableCell>
                <TableCell>{res.response.main.temp_min}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Flex>
      ) : (
        <Flex>
          <Text>Loading...</Text>
        </Flex>
      )}
    </>
  );
};
