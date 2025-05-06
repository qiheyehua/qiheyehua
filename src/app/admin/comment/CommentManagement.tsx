"use client";

import React, { useState, useEffect } from 'react';
import { IconSearch, IconTrash, IconCheck, IconX } from '@tabler/icons-react';

// 定义消息类型
interface Message {
  id: number;
  username: string;
  content: string;
  avatar: string;
  date: string;
}

export default function CommentManagement() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [filteredMessages, setFilteredMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);
  const [deleteStatus, setDeleteStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // 获取所有留言
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/messages');
        if (!response.ok) {
          throw new Error('获取留言失败');
        }
        const data = await response.json();
        setMessages(data);
        setFilteredMessages(data);
      } catch (error) {
        console.error('获取留言失败:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessages();
  }, []);

  // 搜索功能
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredMessages(messages);
    } else {
      const filtered = messages.filter(
        message => 
          message.username.toLowerCase().includes(searchTerm.toLowerCase()) || 
          message.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredMessages(filtered);
    }
  }, [searchTerm, messages]);

  // 删除留言
  const handleDeleteMessage = async (id: number) => {
    if (confirmDelete !== id) {
      setConfirmDelete(id);
      return;
    }
    
    try {
      setDeleteStatus('loading');
      const response = await fetch(`/api/messages/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('删除留言失败');
      }
      
      setDeleteStatus('success');
      setMessages(messages.filter(message => message.id !== id));
      
      // 重置确认删除状态
      setTimeout(() => {
        setConfirmDelete(null);
        setDeleteStatus('idle');
      }, 1500);
    } catch (error) {
      console.error('删除留言失败:', error);
      setDeleteStatus('error');
      
      // 重置错误状态
      setTimeout(() => {
        setConfirmDelete(null);
        setDeleteStatus('idle');
      }, 1500);
    }
  };

  // 取消删除确认
  const handleCancelDelete = () => {
    setConfirmDelete(null);
  };

  // 格式化日期
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="flex h-full w-full flex-1 flex-col gap-2 border-t md:border-t-0 md:border-l border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900">
      <div className="p-4 md:p-8">
        <h1 className="text-2xl font-bold">评论管理</h1>
        <p className="text-gray-500 mt-1">管理网站留言和评论</p>
      </div>
      
      {/* 搜索栏 */}
      <div className="px-4 md:px-8">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <IconSearch className="w-5 h-5 text-gray-400" />
          </div>
          <input 
            type="text" 
            className="block w-full p-2 pl-10 border rounded-lg bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" 
            placeholder="搜索用户名或内容..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      {/* 留言列表 */}
      <div className="p-4 md:p-8 flex-1 overflow-auto">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredMessages.length > 0 ? (
          <div className="overflow-x-auto rounded-lg">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                    用户
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                    留言内容
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                    时间
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
                {filteredMessages.map(message => (
                  <tr key={message.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img className="h-10 w-10 rounded-full" src={message.avatar} alt={message.username} />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {message.username}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 dark:text-white line-clamp-2">
                        {message.content}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(message.date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {confirmDelete === message.id ? (
                        <div className="flex items-center space-x-2">
                          {deleteStatus === 'loading' ? (
                            <span className="text-gray-500 dark:text-gray-400">删除中...</span>
                          ) : deleteStatus === 'success' ? (
                            <span className="text-green-500 dark:text-green-400 flex items-center">
                              <IconCheck className="w-4 h-4 mr-1" /> 已删除
                            </span>
                          ) : deleteStatus === 'error' ? (
                            <span className="text-red-500 dark:text-red-400 flex items-center">
                              <IconX className="w-4 h-4 mr-1" /> 失败
                            </span>
                          ) : (
                            <>
                              <button
                                onClick={() => handleDeleteMessage(message.id)}
                                className="text-red-600 hover:text-red-900 dark:text-red-500 dark:hover:text-red-400"
                              >
                                确认
                              </button>
                              <button
                                onClick={handleCancelDelete}
                                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
                              >
                                取消
                              </button>
                            </>
                          )}
                        </div>
                      ) : (
                        <button
                          onClick={() => handleDeleteMessage(message.id)}
                          className="text-red-600 hover:text-red-900 dark:text-red-500 dark:hover:text-red-400 flex items-center"
                        >
                          <IconTrash className="w-4 h-4 mr-1" />
                          删除
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500 dark:text-gray-400">
              {searchTerm ? '没有找到匹配的留言' : '暂无留言'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 