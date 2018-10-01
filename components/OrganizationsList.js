const Component = ({organizations}) => 
  <ul>
    {organizations.map(
      item => <li key={item.id}>{`Domain: ${item.domain}`}</li>
    )}
  </ul>
  

export default Component