import json
import os

# Function to find a node by name in the children list
def find_node_by_name(name, children):
    for child in children:
        if child['name'] == name:
            return child
    return None

# Function to merge two nodes
def merge_nodes(node1, node2):
    # If both nodes are leaf nodes, merge their values
    if 'value' in node1 and 'value' in node2:
        node1['value'] += node2['value']
    # If at least one node has children, merge their children
    elif 'children' in node1 or 'children' in node2:
        if 'children' not in node1:
            node1['children'] = []
        if 'children' in node2:
            for child2 in node2['children']:
                child1 = find_node_by_name(child2['name'], node1['children'])
                if child1:
                    merge_nodes(child1, child2)
                else:
                    node1['children'].append(child2)

# Function to merge multiple trees
def merge_multiple_trees(json_list):
    if not json_list:
        return {}
    
    # Start with the first tree
    merged_tree = json_list[0]
    
    # Merge each subsequent tree into the merged_tree
    for tree in json_list[1:]:
        merge_nodes(merged_tree, tree)
    
    return merged_tree

# Directory containing JSON files
directory_path = 'JSONswithStandardRanks/BetterIndivJSONfiles'

# Read all JSON files from the directory
json_files = []
for filename in os.listdir(directory_path):
    if filename.endswith('.json'):
        with open(os.path.join(directory_path, filename), 'r') as file:
            json_files.append(json.load(file))

# Merge all JSON structures
merged_tree = merge_multiple_trees(json_files)

# Print the result
print(json.dumps(merged_tree, indent=4))

# Optionally save the merged result to a new JSON file
with open('JSONswithStandardRanks/MergedJSONfile/merged_tree.json', 'w') as outfile:
    json.dump(merged_tree, outfile, indent=4)
