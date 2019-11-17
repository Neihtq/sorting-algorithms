class Node:
    def __init__(self, val, next=None):
        self.val = val
        self.next = next

    def get_val(self):
        return self.val
    
    def set_val(self, val):
        self.val = val

    def get_next(self):
        return self.next

    def set_next(self, next):
        self.next = next


class LinkedList:
    def __init__(self, head):
        self.head = head
    
    def insert_node(self, node):
        if self.head.get_next():
            self.head.get_next().insert_node(self, node)
        else:
            self.head.set_next(node)

    def insert_value(self, value):
        node = Node(value)
        self.insert_node(node)

    def push_node(self, node):
        node.set_next(self.head)
        self.head = node

    def push_value(self, value):
        node = Node(value)
        self.push_node(node)

    def pop(self):
        new_head = self.head.get_next()
        old_head = self.head
        self.head = new_head
        return old_head
    
    def get_node_at_index(self, index):
        tmp = self.head
        for i in range(index):
            if not tmp:
                return IndexError
            tmp = tmp.next
        return tmp         


    def length(self):
        tmp = self.head
        count = 0
        while tmp:
            count += 1
            tmp = tmp.get_next()
        return count

    def search(self, value):
        tmp = self.head
        while tmp:
            if tmp.val == value:
                return tmp
            tmp = tmp.get_next()
        return None